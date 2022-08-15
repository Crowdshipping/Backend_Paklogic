import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation} from './src/navigation';

import StripePayment from './src/stripe/stripePayment';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
      {/* <StripePayment /> */}
    </NavigationContainer>
  );
};

export default App;
