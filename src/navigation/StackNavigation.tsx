import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
  BookingHistory,
  TrackFlight,
  TrackShip,
  LandProductDetail,
  LandReceiverDetail,
  TrackLand,
  LandModifyRequest,
  HistoryDetail,
  ViewProfile,
  EditProfile,
  Claims,
  ClaimDetail,
  LoggedUserResetPassword,
  Complain,
  AddComplain,
  ComplainDetail,
  NotifictionHistory,
  ViewQuery,
  AddQuery,
  QueryDetail,
  RateDriver,
  AddClaim
} from '../screens';
import CustomDrawerContent from './DrawerNavigation';
import { StripePayment, ChatScreen } from '../features';

export type rootStack = {
  Welcome: undefined;
  Register: { countryCode: string; phone: string };
  Signin: undefined;
  ForgotPassword: undefined;
  Splash: undefined;
  Landing: undefined;
  RegisterNumber: undefined;
  ResetPassword: undefined;
  VerifyOtp: { countryCode: string; phone: string };
  PasswordOtp: { email: string };
  StartBooking: undefined;
  ProviderDetail: undefined;
  ReceiverDetails: undefined;
  BookingList: undefined;
  ProductScreen: undefined;
  AirDelivery: undefined;
  ModifyRequest: undefined;
  ShipDelivery: undefined;
  ShipFlowNavigation: undefined;
  LandFlowNavigation: undefined;
  AirFlowNavigation: undefined;
  BookingListShipping: undefined;
  ShipProviderDetail: undefined;
  ShipProductDetail: undefined;
  ShipReceiverDetail: undefined;
  ShipModifyRequest: undefined;
  MyDrawer: undefined;
  StripePayment: undefined;
  ChatScreen: undefined;
  SearchShip: undefined;
  SearchAir: undefined;
  BookingHistory: undefined;
  TrackFlight: undefined;
  TrackShip: undefined;
  TrackLand: undefined;
  LandProductDetail: undefined;
  LandReceiverDetail: undefined;
  LandModifyRequest: undefined;
  HistoryDetail: undefined;
  ViewProfile: undefined;
  EditProfile: undefined;
  Claims: undefined;
  AddClaim: undefined;
  Complain: undefined;
  ClaimDetail: undefined;
  AddComplain: undefined;
  ComplainDetail: undefined;
  LoggedUserResetPassword: undefined;
  NotifictionHistory: undefined;
  ViewQuery: undefined;
  AddQuery: undefined;
  QueryDetail: undefined;
  RateDriver: undefined;
};
const Stack = createStackNavigator<rootStack>();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="DrawerScreens"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="DrawerScreens" component={DrawerScreens} />
      <Stack.Screen name="ShipFlowNavigation" component={ShipFlowNavigation} />
      <Stack.Screen name="LandFlowNavigation" component={LandFlowNavigation} />
      <Stack.Screen name="AirFlowNavigation" component={AirFlowNavigation} />
    </Drawer.Navigator>
  );
};

const DrawerScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="SearchShip" component={ShipDelivery} />
      <Stack.Screen name="BookingHistory" component={BookingHistory} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
      <Stack.Screen name="TrackFlight" component={TrackFlight} />
      <Stack.Screen name="TrackShip" component={TrackShip} />
      <Stack.Screen name="TrackLand" component={TrackLand} />
      <Stack.Screen name="LandModifyRequest" component={LandModifyRequest} />
      <Stack.Screen name="ShipModifyRequest" component={ShipModifyRequest} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Claims" component={Claims} />
      <Stack.Screen name="AddClaim" component={AddClaim} />
      <Stack.Screen name="Complain" component={Complain} />
      <Stack.Screen name="AddComplain" component={AddComplain} />
      <Stack.Screen name="ClaimDetail" component={ClaimDetail} />
      <Stack.Screen name="ComplainDetail" component={ComplainDetail} />
      <Stack.Screen name="ShipFlowNavigation" component={ShipFlowNavigation} />
      <Stack.Screen name="LandFlowNavigation" component={LandFlowNavigation} />
      <Stack.Screen name="AirFlowNavigation" component={AirFlowNavigation} />
      <Stack.Screen name="LoggedUserResetPassword" component={LoggedUserResetPassword} />
      <Stack.Screen name="NotifictionHistory" component={NotifictionHistory} />
      <Stack.Screen name="ViewQuery" component={ViewQuery} />
      <Stack.Screen name="AddQuery" component={AddQuery} />
      <Stack.Screen name="QueryDetail" component={QueryDetail} />
      <Stack.Screen name="StripePayment" component={StripePayment} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="RateDriver" component={RateDriver} />
    </Stack.Navigator>
  )
}

const LandFlowNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName={'StartBooking'}>
      <Stack.Screen name="StartBooking" component={StartBookingScreen} />
      <Stack.Screen name="LandProductDetail" component={LandProductDetail} />
      <Stack.Screen name="LandReceiverDetail" component={LandReceiverDetail} />
      <Stack.Screen name="LandModifyRequest" component={LandModifyRequest} />
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
    </Stack.Navigator>
  );
};

const ShipFlowNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
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
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
    </Stack.Navigator>
  );
};

const AirFlowNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName={'AirDelivery'}>
      <Stack.Screen name="ProviderDetail" component={ProviderDetailScreen} />
      <Stack.Screen name="ReceiverDetails" component={ReceiverDetailsScreen} />
      <Stack.Screen name="BookingList" component={BookingListScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="AirDelivery" component={AirDelivery} />
      <Stack.Screen name="ModifyRequest" component={ModifyRequest} />
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
    </Stack.Navigator>
  );
};
const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName={'Splash'}>
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      {/* <Stack.Screen name="ShipFlowNavigation" component={ShipFlowNavigation} />
      <Stack.Screen name="LandFlowNavigation" component={LandFlowNavigation} /> */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="RegisterNumber" component={RegisterNumberScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="PasswordOtp" component={PasswordOtp} />
    </Stack.Navigator>
  );
};



export default StackNavigation;
