import * as React from 'react';
import {Image} from 'react-native';
import styles from '../components/Styles';
import HomeScreen from '../screens/Home';
import SocialScreen from '../screens/Social';
import StatsScreen from '../screens/Stats';
import SettingsScreen from '../screens/Settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
          tabBarIcon: () => (
            <Image
              source={require('../icons/settings.png')}
              style={styles.icons}
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
