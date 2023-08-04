import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/components/navigators/Navigator';
import {StatusBar} from 'react-native';
import {LoginNavigator} from './src/components/navigators/LoginNavigator';
import firebaseInit from './src/configs/firebase/config';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [username, setUsername] = useState<string>('');

  firebaseInit();

  const changeUser = (newUser: FirebaseAuthTypes.User | null) => {
    setUser(newUser);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(changeUser);
    return subscriber;
  }, []);
  useEffect(() => {
    setInitializing(false);
    console.log("I am being re-rendered.");
  }, [username]);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <LoginNavigator user={user} setUser={changeUser} />
      </NavigationContainer>
    );
  }
  const {email} = user;
  const getUserDataByEmail = async () => {
    try {
      const usersRef = firestore().collection('Users');
      const query = await usersRef
        .where('email', '==', email?.toLowerCase())
        .get();
      if (!query.empty) {
        setUsername(query.docs[0].data().username);
      }
    } catch (err) {
      console.error('Error getting user data: ', err);
    }
  };
  getUserDataByEmail();

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Navigator user={username} />
    </NavigationContainer>
  );
}

export default App;
