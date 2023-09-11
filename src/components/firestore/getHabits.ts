import firestore from '@react-native-firebase/firestore';
import {HabitDataType, HabitType, ProfileType} from '../types';
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

export const getHabitSearch = async (
  search: string,
  page: number,
  selectedTag: string,
  setHabitIds: React.Dispatch<SetStateAction<string[]>>,
) => {
  try {
    const habitTagsDoc = await firestore()
      .collection('Habits')
      .where('tags', 'array-contains', search.toLowerCase())
      .get();
    if (selectedTag === 'Tag') {
      setHabitIds(habitTagsDoc.docs.map(doc => doc.id));
      return habitTagsDoc.docs.map(doc => doc.data()) as HabitDataType[];
    }
    const habitNameDoc = await firestore()
      .collection('Habits')
      .where('name', '==', search.toLowerCase())
      .get();
    if (selectedTag === 'Habits') {
      setHabitIds(habitNameDoc.docs.map(doc => doc.id));
      return habitNameDoc.docs.map(doc => doc.data()) as HabitDataType[];
    }
    const matchingResults: HabitDataType[] = [];
    const habitIds: string[] = [];
    habitTagsDoc.forEach(doc => {
      matchingResults.push(doc.data() as HabitDataType);
      habitIds.push(doc.id);
    });
    habitNameDoc.forEach(doc => {
      if (!matchingResults.includes(doc.data() as HabitDataType)) {
        matchingResults.push(doc.data() as HabitDataType);
        habitIds.push(doc.id);
      }
    });
    setHabitIds(habitIds);
    return matchingResults;
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
