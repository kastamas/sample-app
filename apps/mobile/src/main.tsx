import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import App from './app/App';
import 'react-native-get-random-values';

import OneSignal from 'react-native-onesignal';

OneSignal.setAppId('e4df0a0c-4b2a-4474-b2e1-9788a623b057');

OneSignal.promptForPushNotificationsWithUserResponse();

OneSignal.setNotificationWillShowInForegroundHandler(
  (notificationReceivedEvent) => {
    const notification = notificationReceivedEvent.getNotification();
    console.log('notification: ', notification);
    notificationReceivedEvent.complete(notification);
  }
);

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler((notification) => {
  console.log('OneSignal: notification opened:', notification);
});

AppRegistry.registerComponent('Mobile', () => App);
