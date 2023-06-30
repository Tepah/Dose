import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Styles from "../components/Styles";

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<string[]>([
    'Notification 1',
    'Notification 2',
    'Notification 3',
  ]);

  return (
    <View style={Styles.app}>
      {notifications.map(notification => (
        <Text style={Styles.text}>{notification}</Text>
      ))}
    </View>
  );
};

export default NotificationsScreen;
