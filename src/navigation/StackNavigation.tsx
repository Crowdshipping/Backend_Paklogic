import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  RegisterScreen,
  SigninScreen,
  ForgotPassword,
  WelcomeScreen,
  SplashScreen,
  LandingScreen,
  RegisterNumberScreen,
  ResetPasswordScreen,
  VerifyOtp,
  PasswordOtp,
  StartBookingScreen,
  ProviderDetailScreen,
  ReceiverDetailsScreen,
  BookingListScreen,
} from '../screens/index';

type rootStack = {
  Welcome: undefined;
  Register: {countryCode: string; phone: string};
  Signin: undefined;
  ForgotPassword: undefined;
  Splash: undefined;
  Landing: undefined;
  RegisterNumber: undefined;
  ResetPassword: undefined;
  VerifyOtp: {countryCode: string; phone: string};
  PasswordOtp: {email: string};
  StartBooking: undefined;
  ProviderDetail: undefined;
  ReceiverDetails: undefined;
  BookingList: undefined;
};

const Stack = createStackNavigator<rootStack>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Splash'}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="RegisterNumber" component={RegisterNumberScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="StartBooking" component={StartBookingScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="PasswordOtp" component={PasswordOtp} />
      <Stack.Screen name="ProviderDetail" component={ProviderDetailScreen} />
      <Stack.Screen name="ReceiverDetails" component={ReceiverDetailsScreen} />
      <Stack.Screen name="BookingList" component={BookingListScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
