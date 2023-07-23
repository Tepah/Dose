import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/components/Navigator';
import { StatusBar } from "react-native";

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Navigator />
    </NavigationContainer>
  );
}

export default App;
