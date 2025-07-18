import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshTokenApi } from './authApi';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.2.31:3332/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    const tokenExpirationTimeStr = await AsyncStorage.getItem('tokenExpirationTime');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    let validToken = token;
    if (tokenExpirationTimeStr && refreshToken) {
      let tokenExpirationTime = parseInt(tokenExpirationTimeStr, 10);
      const now = Date.now();
      // DEBUG: Log các giá trị liên quan
      console.log('[Axios][DEBUG] now:', now, 'tokenExpirationTime:', tokenExpirationTime, 'diff:', tokenExpirationTime - now, 'tokenExpirationTimeStr:', tokenExpirationTimeStr, 'refreshToken:', refreshToken);
      // ÉP TEST: Luôn refresh token (chỉ để test, nhớ xóa sau khi kiểm tra)
      // tokenExpirationTime = now - 10000;
      // Nếu token đã hết hạn (hoặc sắp hết hạn trong 5s), tự động refresh
      if (tokenExpirationTime && now >= tokenExpirationTime - 5000) {
        try {
          const res = await refreshTokenApi(refreshToken);
          validToken = res.token;
          await AsyncStorage.setItem('token', res.token);
          if (res.refreshToken) {
            await AsyncStorage.setItem('refreshToken', res.refreshToken);
          }
          if (res.tokenExpirationTime) {
            await AsyncStorage.setItem('tokenExpirationTime', res.tokenExpirationTime.toString());
          }
          console.log('[Axios] Token tự động refresh trước khi gửi request');
        } catch (err) {
          // Nếu refresh lỗi, xóa token và logout
          const { useAuthStore } = require('../store/authStore');
          await useAuthStore.getState().logout();
          throw err;
        }
      }
    }
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${validToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Nếu lỗi là 401/403 và chưa retry
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              const res = await refreshTokenApi(refreshToken); // Gửi refreshToken vào body
              const newToken = res.token;
              const newRefreshToken = res.refreshToken;
              const tokenExpirationTime = res.tokenExpirationTime;
              await AsyncStorage.setItem('token', newToken);
              if (newRefreshToken) {
                await AsyncStorage.setItem('refreshToken', newRefreshToken);
              }
              if (tokenExpirationTime) {
                await AsyncStorage.setItem('tokenExpirationTime', tokenExpirationTime.toString());
              }
              processQueue(null, newToken);
              isRefreshing = false;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              console.log('[Axios] Refresh thành công:', { token: newToken, refreshToken: newRefreshToken, tokenExpirationTime });
              return axiosInstance(originalRequest);
            } catch (refreshError: any) {
              // Nếu refreshToken hết hạn hoặc không hợp lệ, logout và văng ra login
              processQueue(refreshError, null);
              const { useAuthStore } = require('../store/authStore');
              await useAuthStore.getState().logout();
              isRefreshing = false;
              return Promise.reject(refreshError);
            }
          } else {
            // Không có refreshToken, logout luôn
            const { useAuthStore } = require('../store/authStore');
            await useAuthStore.getState().logout();
            isRefreshing = false;
            return Promise.reject(error);
          }
        } catch (err) {
          processQueue(err, null);
          const { useAuthStore } = require('../store/authStore');
          await useAuthStore.getState().logout();
          isRefreshing = false;
          return Promise.reject(err);
        }
      }
      // Nếu đang refresh, đẩy request vào queue
      return new Promise(function (resolve, reject) {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          },
          reject: (err: any) => {
            reject(err);
          }
        });
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 