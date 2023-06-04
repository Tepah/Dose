import React from 'react';
import type {PropsWithChildren} from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import HomeScreen from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SocialScreen from './src/screens/Social';
import StatsScreen from './src/screens/Stats';
import SettingsScreen from './src/screens/Settings';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Social" component={SocialScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
