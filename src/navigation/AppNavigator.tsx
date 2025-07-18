import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { refreshTokenApi } from '../api/authApi';

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  const { token, refreshToken, restoreAuth, updateToken, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await restoreAuth();
      if (!token && refreshToken) {
        try {
          const res = await refreshTokenApi(refreshToken);
          if (res && res.token) {
            await updateToken(res.token, res.refreshToken);
          } else {
            await logout();
          }
        } catch {
          await logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return null; // Có thể thay bằng splash screen

  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator; 