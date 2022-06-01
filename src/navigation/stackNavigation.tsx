import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import Landing from '../screens/Landing/Landing';
import RegisterCompany from '../screens/RegisterCompany/RegisterCompany';
import RegisterDriver from '../screens/RegisterDriver/RegisterDriver';
import RegisterOption from '../screens/RegisterOption/RegisterOption';
import RegisterProvider from '../screens/RegisterProvider/RegisterProvider';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import SignIn from '../screens/SignIn/SignIn';
import Splash from '../screens/Splash/Splash';
import VerifyOtp from '../screens/VerifyOtp/VerifyOtp';
import Welcome from '../screens/Welcome/Welcome';
import { View, Text } from 'react-native';
const Stack = createStackNavigator();
import { createDrawerNavigator } from '@react-navigation/drawer';
import AllRequest from '../screens/AllRequest/AllRequest';
import AcceptBooking from '../screens/Maps/AcceptBooking';
import AcceptBooking2 from '../screens/Maps/AcceptBooking2';
import AcceptBooking3 from '../screens/Maps/AcceptBooking3';
import AcceptBooking4 from '../screens/Maps/AcceptBooking4';
import BookingRequest from '../screens/Maps/BookingRequest';
import { Button } from '../components';
import AllFlight from '../screens/Booking/AllFlight';
import AddTicketDetails from '../screens/Booking/AddTicketDetails';
import EditTicketDetail from '../screens/Booking/EditTicketDetail';
import AvailableFight from '../screens/AvailableFlight/AvailableFlight';
import { CommonActions } from '@react-navigation/native';
import LastBookingHistory from '../screens/Booking/LastBookingHistory';
import PictureDelivery from '../screens/PictureDelivery';
import AddFlightPostRequest from '../screens/AddFlightPostRequest';
import DrawerSideScreen from '../screens/DrawerSideScreen';
import AllShips from '../screens/AllShips';
import AddShipTicket from '../screens/AddShipTicket';
import MyProfile from '../screens/MyProfile';
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }: any) {
  return (
    <Button
      title="Manage Flights"
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate('AllFlight');
        // navigation.dispatch((state: any) => {
        //   const routes = [{name: 'AllFlight'}, ...state.routes];
        //   return CommonActions.reset({
        //     ...state,
        //     routes,
        //     index: 0,
        //   });
        // });
      }}
    />
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={DrawerSideScreen}>
      <Drawer.Screen
        options={{
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: '#DB3F34',
          },
        }}
        name="REQUEST"
        component={Landing}
      />
    </Drawer.Navigator>
  );
};

export const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        options={{
          headerShown: false,
          title: 'Back',
        }}
        name="Drawer"
        component={DrawerNavigator}
      />
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'SIGN IN',
        }}
        name="SIGNIN"
        component={SignIn}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'FORGET PASSWORD',
        }}
        name="ForgetPassword"
        component={ForgetPassword}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'REGISTER',
        }}
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'REGISTER',
        }}
        name="RegisterProvider"
        component={RegisterProvider}
      />
      <Stack.Screen name="ResetPassword" options={{ headerLeft: () => null }} component={ResetPassword} />
      {/* <Stack.Screen name="Landing" component={Landing} /> */}
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="WELCOME"
        component={Welcome}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
        }}
        name="REGISTER"
        component={RegisterOption}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'VERIFY OTP',
        }}
        name="VerifyOtp"
        component={VerifyOtp}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'REGISTER',
        }}
        name="RegisterDriver"
        component={RegisterDriver}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'REGISTER',
        }}
        name="RegisterCompany"
        component={RegisterCompany}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'ALLREQUEST',
        }}
        name="AllRequest"
        component={AllRequest}
      />

      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'REQUEST',
        }}
        name="AcceptBooking"
        component={AcceptBooking}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'REQUEST',
        }}
        name="AcceptBooking2"
        component={AcceptBooking2}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'REQUEST',
        }}
        name="AcceptBooking3"
        component={AcceptBooking3}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'REQUEST',
        }}
        name="AcceptBooking4"
        component={AcceptBooking4}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'REQUEST',
        }}
        name="BookingRequest"
        component={BookingRequest}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'ALL FLIGHTS',
        }}
        name="AllFlight"
        component={AllFlight}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'ADD TICKET DETAILS',
        }}
        name="AddTicket"
        component={AddTicketDetails}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'EDIT TICKET DETAILS',
        }}
        name="EditTicket"
        component={EditTicketDetail}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'AVAILABLE FLIGHTS',
        }}
        name="AvailableFlight"
        component={AvailableFight}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'BOOKING HISTORY',
        }}
        name="DetailFlightBooking"
        component={LastBookingHistory}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'Attach Images',
        }}
        name="attachImage"
        component={PictureDelivery}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'Attach Images',
        }}
        name="AddFlightPostRequest"
        component={AddFlightPostRequest}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'All Ships',
        }}
        name="ALLSHIPS"
        component={AllShips}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'ADD TICKET DETAILS',
        }}
        name="ADDSHIP"
        component={AddShipTicket}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          title: 'ADD TICKET DETAILS',
        }}
        name="MYPROFILE"
        component={MyProfile}
      />

    </Stack.Navigator>
  );
};
