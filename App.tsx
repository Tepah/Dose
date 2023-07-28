import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/components/Navigator';
import {StatusBar} from 'react-native';
import {LoginNavigator} from './src/components/SignIn';
import firebaseInit from './src/firebase/config';

function App(): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  firebaseInit();

  if (!user) {
    return (
      <NavigationContainer>
        <LoginNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Navigator />
    </NavigationContainer>
  );
}

export default App;
