import firestore from '@react-native-firebase/firestore';
import {ProfileType} from '../types';

export const getProfileHabits = async (username: string) => {
  try {
    const query = await firestore().collection('Users').doc(username).get();
    if (query.exists) {
      const profile: ProfileType = query.data() as ProfileType;
      return profile.habits;
    }
  } catch (err) {
    console.error('Error getting habits: ', err);
  }
};
