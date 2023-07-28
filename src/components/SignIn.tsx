import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUp, SignUpScreen} from '../screens/signups/SignUp';
import {WelcomeScreen} from '../screens/signups/Welcome';
import {EmailSignInScreen} from '../screens/signups/EmailSignIn';

const stack = createNativeStackNavigator();
export const LoginNavigator = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  //
  // if (initializing) {
  //   return null;
  // }

  return (
    <stack.Navigator>
      <stack.Screen name="Welcome" component={WelcomeScreen} />
      <stack.Screen name="Sign Up" component={SignUpScreen} />
      <stack.Screen name="Email Sign Up" component={EmailSignInScreen} />
    </stack.Navigator>
  );
};
