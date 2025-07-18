import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    console.log('Token gửi lên:', token);
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Xử lý logout khi token hết hạn hoặc không hợp lệ
      const { useAuthStore } = require('../store/authStore');
      await useAuthStore.getState().logout();
      // Có thể thêm logic điều hướng về Login nếu cần
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 