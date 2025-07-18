import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: any;
  setAuth: (token: string, refreshToken: string, user?: any) => Promise<void>;
  logout: () => Promise<void>;
  updateToken: (token: string, refreshToken?: string) => Promise<void>;
  restoreAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  refreshToken: null,
  user: null,
  setAuth: async (token, refreshToken, user) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    if (user) await AsyncStorage.setItem('user', JSON.stringify(user));
    set({ token, refreshToken, user });
    console.log('[AuthStore] setAuth:', { token, refreshToken, user });
  },
  logout: async () => {
    await AsyncStorage.multiRemove(['token', 'refreshToken', 'user']);
    set({ token: null, refreshToken: null, user: null });
  },
  updateToken: async (token, refreshToken) => {
    await AsyncStorage.setItem('token', token);
    if (refreshToken) await AsyncStorage.setItem('refreshToken', refreshToken);
    set((state) => ({
      token,
      refreshToken: refreshToken ?? state.refreshToken,
    }));
    console.log('[AuthStore] updateToken:', { token, refreshToken });
  },
  restoreAuth: async () => {
    const [token, refreshToken, user] = await Promise.all([
      AsyncStorage.getItem('token'),
      AsyncStorage.getItem('refreshToken'),
      AsyncStorage.getItem('user'),
    ]);
    set({
      token,
      refreshToken,
      user: user ? JSON.parse(user) : null,
    });
  },
})); 