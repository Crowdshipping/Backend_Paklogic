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
  ProductScreen,
  AirDelivery,
  ModifyRequest,
  ShipDelivery,
  BookingListShipping,
  ShipProviderDetail,
  ShipProductDetail,
  ShipReceiverDetail,
  ShipModifyRequest,
} from '../screens';

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
  ProductScreen: undefined;
  AirDelivery: undefined;
  ModifyRequest: undefined;
  ShipDelivery: undefined;
  ShipFlowNavigation: undefined;
  BookingListShipping: undefined;
  ShipProviderDetail: undefined;
  ShipProductDetail: undefined;
  ShipReceiverDetail: undefined;
  ShipModifyRequest: undefined;
};

const Stack = createStackNavigator<rootStack>();

const ShipFlowNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName={'ShipDelivery'}>
      <Stack.Screen name="ShipDelivery" component={ShipDelivery} />
      <Stack.Screen
        name="BookingListShipping"
        component={BookingListShipping}
      />
      <Stack.Screen name="ShipProviderDetail" component={ShipProviderDetail} />
      <Stack.Screen name="ShipProductDetail" component={ShipProductDetail} />
      <Stack.Screen name="ShipReceiverDetail" component={ShipReceiverDetail} />
      <Stack.Screen name="ShipModifyRequest" component={ShipModifyRequest} />
    </Stack.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
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
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="AirDelivery" component={AirDelivery} />
      <Stack.Screen name="ModifyRequest" component={ModifyRequest} />
      <Stack.Screen name="ShipFlowNavigation" component={ShipFlowNavigation} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
