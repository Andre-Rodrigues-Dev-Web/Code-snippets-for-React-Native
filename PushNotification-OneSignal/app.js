import React, { useState } from 'react';
import { View } from 'react-native';
import OneSignal from 'react-native-onesignal';

export function WelcomeScreen() {
  return (
    <View style={styles.containerWelcome}>
      <FastImage
        style={styles.img}
        source={require('./assets/splash.gif')}
        resizeMode={FastImage.resizeMode.contain}
    />
    </View>
  );
}

const App = () => {
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId("your OneSignal id here");
  //END OneSignal Init Code

  //Prompt for push on iOS
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    console.log("Prompt response:", response);
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

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log("OneSignal: notification opened:", notification);
  });

  return (
    <View/>
  );
}

export default App;
