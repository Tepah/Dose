import React from 'react';
import HomeScreen from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import SocialScreen from './src/screens/Social';
import StatsScreen from './src/screens/Stats';
import SettingsScreen from './src/screens/Settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styles from './src/components/Styles';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.navigator,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Social"
          component={SocialScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
