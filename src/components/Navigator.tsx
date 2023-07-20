import * as React from 'react';
import {Image} from 'react-native';
import styles from '../components/Styles';
import HomeScreen from '../screens/Home';
import SocialScreen from '../screens/Social';
import StatsScreen from '../screens/Stats';
import ProfileScreen from '../screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {mockProfileList} from '../test/mockProfile1';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationsScreen from '../screens/Notifications';
import SearchScreen from '../screens/Search';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


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
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../icons/home.png')}
              style={[styles.icons, focused ? styles.iconFocused : null]}
              resizeMode="contain"
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Social"
        component={SocialStackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../icons/social.png')}
              style={[styles.icons, focused ? styles.iconFocused : null]}
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
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../icons/stats.png')}
              style={[styles.icons, focused ? styles.iconFocused : null]}
              resizeMode="contain"
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={mockProfileList['@petah'].profilePic}
              style={[
                styles.icons,
                styles.userPostImage,
                focused ? styles.iconFocused : null,
              ]}
              resizeMode="contain"
            />
          ),
          headerShown: false,
        }}
        initialParams={{user: mockProfileList['@petah']}}
      />
    </Tab.Navigator>
  );
};

const SocialStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={SocialScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileSearch"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
