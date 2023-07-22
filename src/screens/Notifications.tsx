import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import Styles from '../components/Styles';
import {mockProfileList} from '../test/mockProfile1';
import {CloseButton} from '../components/Close';

/* TODO: Implement different types of pressables so */
const NotificationsScreen = ({navigation}: any) => {
  const [notifications, setNotifications] = useState<string[]>([
    'Notification 1 I dont knowhow this looks blah blah blah',
    'Notification 2',
  ]);

  const renderNotifications = notifications.map(
    (notification: string, index: number) => (
      <Pressable key={index} style={Styles.notificationContainer}>
        <Text style={[Styles.text, Styles.userText]}>
          {mockProfileList['@petah'].username}
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
        <CloseButton type={'back'} closeFunction={() => navigation.goBack()} />
      </View>
      <ScrollView style={Styles.notificationScroll}>
        {renderNotifications}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
