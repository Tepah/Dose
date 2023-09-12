import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/components/navigators/Navigator';
import {StatusBar} from 'react-native';
import {LoginNavigator} from './src/components/navigators/LoginNavigator';
import firebaseInit from './src/configs/firebase/config';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import UserContext from './src/Contexts/UserContext';
import {ProfileType} from './src/components/types';

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [username, setUsername] = useState<string>('');
  const [profile, setProfile] = useState<ProfileType | undefined>();
  const firstRender = useRef(true);

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
    firstRender.current = true;
  }, [user]);

  useEffect(() => {
    if (profile) {
      console.log('Profile updated: ', profile);
    }
  }, [profile]);

  if (initializing) {
    return null;
  }
  // Login Page
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
        setProfile(query.docs[0].data() as ProfileType);
      }
    } catch (err) {
      console.error('Error getting user data: ', err);
    }
  };
  if (firstRender.current || !profile) {
    console.log('Getting user data...');
    getUserDataByEmail();
    firstRender.current = false;
  }

  // Main Page
  return (
    <UserContext.Provider value={{username, profile, setProfile}}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Navigator />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
