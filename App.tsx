import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation } from './src/navigation';
import BookingRequest from './src/screens/Maps/BookingRequest';
import BookingHistory from './src/screens/Booking/BookingHistory';
import AddTicketDetails from './src/screens/Booking/AddTicketDetails';
import EditTicketDetail from './src/screens/Booking/EditTicketDetail';
import AllFlight from './src/screens/Booking/AllFlight';
import AllRequest from './src/screens/AllRequest/AllRequest';
import AvailableFight from './src/screens/AvailableFlight/AvailableFlight';
import LastBookingHistory from './src/screens/Booking/LastBookingHistory';
import PictureDelivery from './src/screens/PictureDelivery';
import {
  RegisterCompany,
  RegisterProvider,
  ResetPassword,
  VerifyOtp,
} from './src/screens';
import MyTest from './src/screens/MyTest';
import AddShip from './src/screens/AddShipTicket';
import AddShipTicket from './src/screens/AddShipTicket';
import AllShips from './src/screens/AllShips';
// import MapsPickedUp from './src/screens/Maps/MapsPickedUp';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <LastBookingHistory />
    // <PictureDelivery />
    // <AddTicketDetails />
    // <MyTest />
    // <AvailableFight />
    // <RegisterProvider />
    // <ResetPassword/>
    // <MyTest />
    // <AllShips />
    // <AddShipTicket />
    //////////////////////
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
// import React, {useState} from 'react';
// import {Button, Text, View} from 'react-native';

// function App() {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Button title="Show modal" onPress={toggleModal} />

//     </View>
//   );
// }

// export default App;
