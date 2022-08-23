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
import MyTest from './MyTest';
import OneSignal from 'react-native-onesignal';
import { ONESIGNAL_APP_ID } from './src/appConstants';
const App = () => {
  StatusBar.setBarStyle('light-content', true);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const NotificationHandler = () => {
    // OneSignal Initialization
    OneSignal.setAppId(ONESIGNAL_APP_ID);
  
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response);
    });
    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();
      console.log("notification: ", notification);
      const data = notification.additionalData
      console.log("additionalData: ", data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    });
  } 

 React.useEffect(()=>{
      NotificationHandler();
 },[])


  return (
    // <MyTest />
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <StackNavigation />
      {/* <DriverNavigation /> */}
    </NavigationContainer>
  );
};
export default App;
