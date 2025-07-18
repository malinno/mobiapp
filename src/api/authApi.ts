import axiosInstance from './axiosInstance';

export interface LoginPayload {
  accountName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user?: any;
}

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  const response = await axiosInstance.post('/Auth/login', payload);
  return response.data;
}

export async function refreshTokenApi(refreshToken: string): Promise<LoginResponse> {
  const response = await axiosInstance.post('/Auth/refresh', { refreshToken });
  return response.data;
} 