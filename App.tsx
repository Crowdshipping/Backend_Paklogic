import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/navigation';

import OneSignal from 'react-native-onesignal';
import { ONESIGNAL_APP_ID } from './src/appConstants';

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


const App = () => {
  useEffect(() => {
    NotificationHandler()
  }, [])

  return (
    <NavigationContainer>
      <StackNavigation />
      {/* <StripePayment /> */}
    </NavigationContainer>
  );
};

export default App;
