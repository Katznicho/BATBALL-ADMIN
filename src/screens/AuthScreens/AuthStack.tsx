import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import VerificationScreen from './VerificationScreen';
import ResendEmailScreen from './ResendEmail';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="ResendEmail" component={ResendEmailScreen} />

      <Stack.Screen name="Verification" component={VerificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
