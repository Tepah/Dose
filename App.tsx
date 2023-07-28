import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/components/Navigator';
import {StatusBar} from 'react-native';
import {SignInScreen} from './src/components/SignIn';
import firebaseInit from './src/firebase/config';

function App(): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  firebaseInit();

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      {!user ? <SignInScreen /> : <Navigator />}
    </NavigationContainer>
  );
}

export default App;
