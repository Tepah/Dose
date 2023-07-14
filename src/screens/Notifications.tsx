import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import Styles from '../components/Styles';
import {mockProfile1} from '../test/mockProfile1';

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

  const renderNotifications = notifications.map(
    (notification: string, index: number) => (
      <Pressable key={index} style={Styles.notificationContainer}>
        <Text style={[Styles.text, Styles.userText]}>
          {mockProfile1.username}
        </Text>
        <View style={Styles.notificationTextContainer}>
          <Text style={[Styles.text, Styles.notificationText]}>
            {notification}
          </Text>
        </View>
      </Pressable>
    ),
  );

  return (
    <View style={Styles.app}>
      <View style={Styles.header}>
        <Text style={[Styles.text, Styles.notificationHeaderText]}>
          Notifications
        </Text>
      </View>
      <ScrollView style={Styles.notificationScroll}>
        {renderNotifications}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
