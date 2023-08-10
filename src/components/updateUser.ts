import firestore from '@react-native-firebase/firestore';
import {useContext} from 'react';
import UserContext from '../Contexts/UserContext';
import {ProfileType} from './types';

type UserChanges = {
  description: string;
  name: string;
  profilePic: any;
  private: boolean;
};

export const updateUser = async (user: string, changes: UserChanges) => {
  try {
    const userRef = firestore().collection('Users').doc(user);
    await userRef.update(changes);
    const userDoc = await userRef.get();
    return userDoc.data() as ProfileType;
  } catch (err) {
    console.log('Error updating user: ' + err);
  }
};
