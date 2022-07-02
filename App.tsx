import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation } from './src/navigation';

import PackageDetail from './src/screens/PackageDetail';
import DriverHome from './src/modules/Driver/Screens/Home/DriverHome';
import { DriverNavigation } from './src/navigation/DriverNavigation';
const App = () => {
  StatusBar.setBarStyle('light-content', true);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <StackNavigation /> */}
      <DriverNavigation />
    </NavigationContainer>
  );
};
export default App;
