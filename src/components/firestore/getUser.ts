import firestore from '@react-native-firebase/firestore';
import {ProfileType} from '../types';

export const getUser = async (username: string) => {
  try {
    const userRef = await firestore().collection('Users').doc(username);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      return userDoc.data() as ProfileType;
    }
  } catch (err) {
    console.log('Error getting user: ' + err);
  }
};