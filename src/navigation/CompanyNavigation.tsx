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
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CompanyDrawer}>
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
        name="CrowdShipping"
        component={CompanyDashboard}
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
          name="Drawer"
          component={DrawerNavigator}
        />
        <Stack.Screen
          name="CompanyDashboard"
          component={CompanyDashboard}
          options={{ headerShown: false }}
      />
        <Stack.Screen
          name="AddDriver"
          component={AddDriver}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="AddVehicle"
          component={AddVehicleCompany}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="AllVehicle"
          component={AllVehiclesCompany}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="EditVehicle"
          component={EditVehicleCompany}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="AllDrivers"
          component={AllDriverCompany}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="AssignDrivers"
          component={AssignDriverCompany}
          options={{ 
            headerTitle: "All Drivers",
            headerTitleAlign: 'center' }}
      />
        </Stack.Navigator>
        )
        }