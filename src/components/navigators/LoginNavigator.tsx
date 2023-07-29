import React, {useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpScreen} from '../../screens/signups/SignUp';
import {WelcomeScreen} from '../../screens/signups/Welcome';
import {EmailSignUpScreen} from '../../screens/signups/EmailSignUp';
import {LoginScreen} from '../../screens/signups/Login';

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
      <stack.Screen name="Welcome" component={WelcomeScreen} />
      <stack.Screen name='Login' component={LoginScreen} />
      <stack.Screen name="Sign Up" component={SignUpScreen} />
      <stack.Screen name="Email Sign Up" component={EmailSignUpScreen} />
    </stack.Navigator>
  );
};
