import * as React from 'react';
import {Image} from 'react-native';
import styles from '../components/Styles';
import HomeScreen from '../screens/Home';
import SocialScreen from '../screens/Social';
import StatsScreen from '../screens/Stats';
import SettingsScreen from '../screens/Settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { mockProfile1 } from "../test/mockProfile1";

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.navigator,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../icons/home.png')}
              style={styles.icons}
              resizeMode="contain"
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Social"
        component={SocialScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => (
            <Image
              source={require('../icons/social.png')}
              style={styles.icons}
              resizeMode="contain"
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../icons/stats.png')}
              style={styles.icons}
              resizeMode="contain"
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => (
            <Image
              source={mockProfile1.profilePic}
              style={[styles.icons, styles.userPostImage]}
              resizeMode="contain"
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigator;
