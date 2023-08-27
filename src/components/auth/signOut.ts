import auth from '@react-native-firebase/auth';
import {ProfileType} from '../types';
import React from 'react';

export const signOut = (
  setProfile: React.Dispatch<React.SetStateAction<ProfileType | undefined>>,
) => {
  auth()
    .signOut()
    .then(() => {
      setProfile(undefined);
      console.log('User signed out!');
    });
};
