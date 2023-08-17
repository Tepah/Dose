import firestore from '@react-native-firebase/firestore';
import {HabitDataType, ProfileType} from '../types';
import {SetStateAction} from 'react';

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

export const getHabitSearch = async (search: string, page: number) => {
  try {
    const habitTagsDoc = await firestore()
      .collection('Habits')
      .where('tags', 'array-contains', search.toLowerCase())
      .get();
    const habitNameDoc = await firestore()
      .collection('Habits')
      .where('name', '==', search.toLowerCase())
      .get();
    const matchingResults: HabitDataType[] = [];
    habitTagsDoc.forEach(doc => {
      matchingResults.push(doc.data() as HabitDataType);
    });
    habitNameDoc.forEach(doc => {
      if (!matchingResults.includes(doc.data() as HabitDataType)) {
        matchingResults.push(doc.data() as HabitDataType);
      }
    });
    console.log('matchingResults: ', matchingResults);
  } catch (err) {
    console.error('Error getting habits: ', err);
  }
};

export const fetchHabitData = async (
  tag: string,
  setHabitIds: React.Dispatch<SetStateAction<string[]>>,
  setHabits: React.Dispatch<SetStateAction<HabitDataType[]>>,
) => {
  try {
    const habits = await firestore()
      .collection('Habits')
      .where('tags', 'array-contains', tag.toLowerCase())
      .get();
    setHabitIds(habits.docs.map(doc => doc.id));
    setHabits(habits.docs.map(doc => doc.data()) as HabitDataType[]);
  } catch (err) {
    console.error('Error fetching habit data: ', err);
  }
};
