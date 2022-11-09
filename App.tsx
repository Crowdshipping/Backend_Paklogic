import 'react-native-gesture-handler';
import React, {createContext, useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation} from './src/navigation';

import OneSignal from 'react-native-onesignal';
import {ONESIGNAL_APP_ID} from './src/appConstants';

interface IuserData {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  profilepic: string;
  isSuspended: boolean;
}

let init: any;
export let AppContext = createContext(init);

const App = () => {
  const [userData, setUserData] = useState<IuserData>({
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    profilepic: '',
    isSuspended: true,
  });
  const [notificationData, setNotificationData] = useState<any>({});

  const NotificationHandler = () => {
    // OneSignal Initialization
    OneSignal.setAppId(ONESIGNAL_APP_ID);

    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response);
    });
    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      },
    );
    OneSignal.setNotificationOpenedHandler(openedEvent => {
      const {action, notification} = openedEvent;
      setNotificationData(notification.additionalData);

      // alert(notification.additionalData.url);
      // setUrl(notification.additionalData.url);
    });
  };

  useEffect(() => {
    NotificationHandler();
  }, []);

  return (
    <AppContext.Provider
      value={{userData, setUserData, notificationData, setNotificationData}}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
