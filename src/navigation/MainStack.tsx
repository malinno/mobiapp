import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen,MenuScreen,ProductionStageScreen,BtpMixLuyenScreen } from '../screens';
const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Productions" component={ProductionStageScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name ="Menu" component={MenuScreen} />
    <Stack.Screen name ="BtpMixLuyen" component={BtpMixLuyenScreen} />
  </Stack.Navigator>
);

export default MainStack; 