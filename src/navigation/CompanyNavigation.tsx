import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
const Stack = createStackNavigator();
import { createDrawerNavigator } from '@react-navigation/drawer';
import CompanyDrawer from '../modules/Company/Screens/Drawer/CompanyDrawer';
import CompanyDashboard from '../modules/Company/Screens/Home/CompanyDashboard';
import AddDriver from '../modules/Company/Screens/Driver/AddDriver';
import AddVehicleCompany from '../modules/Company/Screens/Vehicle/AddVehicleCompany';
import AllVehiclesCompany from '../modules/Company/Screens/Vehicle/AllVehiclesCompany';
import EditVehicleCompany from '../modules/Company/Screens/Vehicle/EditVehicalCompany';
import AllDriverCompany from '../modules/Company/Screens/Driver/AllDriverCompany';
import AssignDriverCompany from '../modules/Company/Screens/Driver/AssignDriverCompany';
import DriverBookingHistory from '../modules/Company/Screens/History/DriverBookingHistory';
import DriverDetailsCompany from '../modules/Company/Screens/Driver/DriverDetailsCompany';
import DriverBookingHistoryDetail from '../modules/Company/Screens/History/DriverBookingHistoryDetails';
import MyProfile from '../screens/MyProfile';
import EditMyProfile from '../screens/EditMyProfile';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CompanyDrawer}>
      <Drawer.Screen
        options={{
          headerTitleAlign: 'center',
          headerTintColor: 'black',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
         
          },

        }}
        name="CROWDSHIPPING"
        component={CompanyDashboard}
      />
      <Drawer.Screen
          options={{
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle:'ALL VEHICLE'
          }}
          name="AllVehicle"
          component={AllVehiclesCompany}
      />
      <Drawer.Screen
          options={{
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle:'ALL DRIVER'
          }}
          name="AllDrivers"
          component={AllDriverCompany}
      />
      
    </Drawer.Navigator>
  );
};


  export const CompanyNavigation = () => {
    return (
      <Stack.Navigator 
        screenOptions={{ gestureEnabled: false }}
        initialRouteName="Drawer"
        >
        <Stack.Screen
          options={{
            headerShown: false,
            title: 'Back',
          }}
          name="CompanyDrawer"
          component={DrawerNavigator}
        />
        <Stack.Screen
          name="AddDriver"
          component={AddDriver}
          options={{
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle:'ADD DRIVER'

          }}
      />
      <Stack.Screen
          name="AddVehicle"
          component={AddVehicleCompany}
          options={{
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle:'ADD VEHICLE'

          }}
      />
      <Stack.Screen
          name="EditVehicle"
          component={EditVehicleCompany}
          options={{
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle:'EDIT VEHICLE'

          }}
      />
      <Stack.Screen
          name="AssignDrivers"
          component={AssignDriverCompany}
          options={{ 
            headerTitle: "ASSIGN DRIVER",
            headerTitleAlign: 'center' }}
      />
      <Stack.Screen
          name="DriversBookingHistory"
          component={DriverBookingHistory}
          options={{
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle:'BOOKING HISTORY'

          }}
          />
          <Stack.Screen
            name="DriverDetailScreen"
            component={DriverDetailsCompany}
            options={{
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle:'Driver Details'

            }}
          />
          <Stack.Screen
            name="DriverBookingHistoryDetails"
            component={DriverBookingHistoryDetail}
            options={{
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle:'Booking Details'

            }}
          />
          <Stack.Screen
            name="CompanyProfile"
            component={MyProfile}
            options={{
            headerShown:false

            }}
          />
          <Stack.Screen
            name="EditMyProfile"
            component={EditMyProfile}
            options={{
            headerShown:false

            }}
          />
        </Stack.Navigator>
        )
        }