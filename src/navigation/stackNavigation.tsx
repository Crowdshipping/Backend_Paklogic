import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import Landing from '../screens/Home/Home';
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
const Stack = createStackNavigator();
import { createDrawerNavigator } from '@react-navigation/drawer';
import AllRequest from '../screens/Home/Requests/Requests';
import AcceptBooking from '../screens/Flight/AcceptBookingForFlight';
import BookingRequest from '../screens/Flight/BookingRequest';
import AllFlight from '../screens/Flight/AllFlights';
import AddTicketDetails from '../screens/Flight/AddFlightTicket';
import EditTicketDetail from '../screens/Flight/EditFlightTicket';
import AvailableFight from '../screens/Flight/AvailableFlight';
import LastBookingHistory from '../screens/Flight/FlightDetail';
import PictureDelivery from '../screens/PictureDelivery';
import AddFlightPostRequest from '../screens/Flight/AddFlightPostRequest';
import DrawerSideScreen from '../screens/DrawerSideScreen';
import AllShips from '../screens/Ship/AllShips';
import AddShipTicket from '../screens/Ship/AddShipTicket';
import MyProfile from '../screens/MyProfile';
import PackageDetail from '../screens/PackageDetail';
import AddShipPostRequest from '../screens/Ship/AddShipPostRequest';
import PickedUpForShip from '../screens/Ship/AcceptBookingForShip';
import ShipDetail from '../screens/Ship/ShipDetail';
import AcceptRejectForShip from '../screens/Ship/AcceptRejectForShip';
import Claim from '../screens/Claim/Claim';
import ClaimDetail from '../screens/Claim/ClaimDetail';
import Complain from '../screens/Complain/Complain';
import AddComplain from '../screens/Complain/AddComplain';
import ComplainDetail from '../screens/Complain/ComplainDetail';
import AddClaim from '../screens/Claim/AddClaim';
import BookingHistory from '../screens/Home/History/BookingHistory';
import DriverHome from '../modules/Driver/Screens/Home/DriverHome';
import { DriverNavigation } from './DriverNavigation';
const Drawer = createDrawerNavigator();
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
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        options={{
          headerShown: false,
          title: 'Back',
        }}
        name="Drawer"
        component={DrawerNavigator}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          title: 'Back',
        }}
        name="DriverNavigation"
        component={DriverNavigation}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
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
      <Stack.Screen
        name="ResetPassword"
        options={{ headerLeft: () => null }}
        component={ResetPassword}
      />
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
          title: 'Package Details',
        }}
        name="PACKAGEDETAIL"
        component={PackageDetail}
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
        name="AddShipPostRequest"
        component={AddShipPostRequest}
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
          title: 'Request Details',
        }}
        name="PICKEDUPFORSHIP"
        component={PickedUpForShip}
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
          title: 'Ship Detail',
        }}
        name="SHIPDETAIL"
        component={ShipDetail}
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
        name="ACCEPTREJECTFORSHIP"
        component={AcceptRejectForShip}
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
          title: 'Claim',
        }}
        name="CLAIM"
        component={Claim}
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
          title: 'Add Claim',
        }}
        name="ADDCLAIM"
        component={AddClaim}
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
          title: 'Claim Detail',
        }}
        name="CLAIMDETAIL"
        component={ClaimDetail}
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
          title: 'Complain',
        }}
        name="COMPLAIN"
        component={Complain}
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
          title: 'Add Complain',
        }}
        name="ADDCOMPLAIN"
        component={AddComplain}
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
          title: 'Complain Detail',
        }}
        name="COMPLAINDETAIL"
        component={ComplainDetail}
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
          title: 'Booking History',
        }}
        name="BOOKINGHISTORY"
        component={BookingHistory}
      />
      {/* Driver Screens */}

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
          title: 'Booking History',
        }}
        name="DRIVERHOME"
        component={DriverHome}
      />
    </Stack.Navigator>
  );
};
