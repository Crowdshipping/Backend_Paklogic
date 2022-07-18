import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Landing from '../screens/Home/Home';
import Splash from '../screens/Splash/Splash';
const Stack = createStackNavigator();
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerSideScreen from '../screens/DrawerSideScreen';
import DriverHome from '../modules/Driver/Screens/Home/DriverHome';
import { Welcome } from '../screens';
import DriverDrawer from '../modules/Driver/Screens/Drawer/DriverDrawer';
import AllVehicles from '../modules/Driver/Screens/Vehicle/AllVehicles';
import VehicleDetail from '../modules/Driver/Screens/Vehicle/Components/VehicleDetail/VehicleDetail';
import AddVehicle from '../modules/Driver/Screens/Vehicle/AddVehicle';
import VechicleRequests from '../modules/Driver/Screens/Home/Requests/VehicleRequests';
import AcceptBookingForVehicle from '../modules/Driver/Screens/Home/Requests/AcceptOrRejectForVehicle';
import VehicleHistory from '../modules/Driver/Screens/Home/History/VehicleHistory';
import TrackingVehicle from '../modules/Driver/Screens/Vehicle/TrackingVehicle';
import MyProfile from '../screens/MyProfile';
import VehiclePackageDetail from '../modules/Driver/Screens/Vehicle/VehiclePackageDetail';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={DriverDrawer}>
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
        component={DriverHome}
      />
    </Drawer.Navigator>
  );
};

export const DriverNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Drawer"
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
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
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
          title: 'All Vehicles',
        }}
        name="ALLVEHICLES"
        component={AllVehicles}
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
          title: 'Vehicles Detail',
        }}
        name="VEHICLEDETAIL"
        component={VehicleDetail}
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
          title: 'Add Vehicle',
        }}
        name="ADDVEHICLE"
        component={AddVehicle}
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
          title: 'All Requests',
        }}
        name="VEHICLEREQUEST"
        component={VechicleRequests}
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
          title: 'All Requests',
        }}
        name="ACCEPTORREJECTFORVEHICLE"
        component={AcceptBookingForVehicle}
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
          title: 'History',
        }}
        name="VEHICLEHISTORY"
        component={VehicleHistory}
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
          title: 'Tracking Vehicle',
        }}
        name="TRACKINGVEHICLE"
        component={TrackingVehicle}
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
        name="VEHICLEPACKAGEDETAIL"
        component={VehiclePackageDetail}
      />

    </Stack.Navigator>
  );
};
