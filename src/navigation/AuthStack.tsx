import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {LoginScreen,IntroScreen, HomeScreen, ProductionStageScreen } from '../screens';
export type AuthStackParamList = {
  Intro: undefined;
  Login: undefined;
  Home: undefined;
  Productions:undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Intro" component={IntroScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="Productions" component={ProductionStageScreen}/>

  </Stack.Navigator>
);

export default AuthStack; 