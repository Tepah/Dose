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

export const findUsers = async (search: string) => {
  try {
    const usersCollection = await firestore().collection('Users');
    const userDoc = await usersCollection
      .where('searchterms', 'array-contains', search.toLowerCase())
      .get();
    console.log('Hello:', userDoc.docs);
    if (userDoc.docs.length > 0) {
      const dataArray = userDoc.docs.map(docRefOrSnapshot => {
        return docRefOrSnapshot.data();
      });
      return dataArray as ProfileType[];
    }
  } catch (err) {
    console.log('Error finding user: ' + err);
  }
};

export const checkUserHabit = async (username: string) => {
  // TODO: Make a batch to collect all values of the users habits
  try {
    const userRef = await firestore().collection('Users').doc(username);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      return userDoc.data()?.followers;
    }
  } catch (err) {
    console.log('Error getting user Habit: ' + err);
  }
};
