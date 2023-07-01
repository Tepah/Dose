import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import Styles from "../components/Styles";
import { mockProfile1 } from "../test/mockProfile1";

/* TODO: Implement different types of pressables so */
const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<string[]>([
    'Notification 1 I dont knowhow this looks blah blah blah',
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
      <Text style={[Styles.text, Styles.notificationHeaderText]}>
        Notifications
      </Text>
      <ScrollView style={Styles.notificationScroll}>
        {notifications.map(notification => (
          <Pressable style={Styles.notificationContainer}>
            <Text style={[Styles.text, Styles.userText]}>{mockProfile1.username}</Text>
            <View style={Styles.notificationTextContainer}>
              <Text style={[Styles.text, Styles.notificationText]}>
                {notification}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
