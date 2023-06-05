import React from 'react';
import {View} from 'react-native';
import HomeScreen from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SocialScreen from './src/screens/Social';
import StatsScreen from './src/screens/Stats';
import SettingsScreen from './src/screens/Settings';
import Styles from './src/components/Styles';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Social"
          component={SocialScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Stats"
          component={StatsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
