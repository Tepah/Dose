import React, {useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WelcomeScreen} from '../../screens/signups/Welcome';
import {EmailSignUpScreen} from '../../screens/signups/EmailSignUp';
import {LoginScreen} from '../../screens/signups/Login';
import {GmailSignUpScreen} from '../../screens/signups/GmailSignUp';

const stack = createNativeStackNavigator();
export const LoginNavigator = (prop: any) => {
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    prop.setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <stack.Navigator initialRouteName="Main">
      <stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="Email Sign Up"
        component={EmailSignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="Gmail Sign Up"
        component={GmailSignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
};
