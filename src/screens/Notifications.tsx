import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import Styles from "../components/Styles";
import { mockProfile1 } from "../test/mockProfile1";

/* TODO: Implement different types of pressables so */
const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<string[]>([
    'Notification 1',
    'Notification 2',
    'Notification 3',
    'Notification 4',
    'Notification 5',
    'Notification 6',
    'Notification 7',
    'Notification 8',
    'Notification 9',
  ]);

  return (
    <View style={Styles.app}>
      <ScrollView style={Styles.notificationScroll}>
        {notifications.map(notification => (
          <Pressable style={Styles.notificationContainer}>
            <Text style={[Styles.text, Styles.userText]}>{mockProfile1.username}</Text>
            <Text style={[Styles.text, Styles.notificationText]}>{notification}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
