import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/components/Navigator';
import {StatusBar} from 'react-native';
import {LoginNavigator} from './src/components/LoginNavigator';
import firebaseInit from './src/firebase/config';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  firebaseInit();

  const changeUser = (newUser: FirebaseAuthTypes.User | null) => {
    setUser(newUser);
    setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(changeUser);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <NavigationContainer>
        <LoginNavigator user={user} setUser={changeUser} />
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
