import {HabitType, ProfileType} from './types';
import firestore from '@react-native-firebase/firestore';
import {useContext} from 'react';
import userContext from '../Contexts/UserContext';

const addHabit = (
  habit: HabitType,
  username: string,
  setProfile: (profile: ProfileType) => void,
) => {
  const syncHabit = async () => {
    try {
      const query = await firestore().collection('Users').doc(username).get();
      if (query.exists) {
        const newProfile: ProfileType = query.data() as ProfileType;
        newProfile.habits.push(habit);
        await firestore().collection('Users').doc(username).update(newProfile);
        setProfile(newProfile);
      }
    } catch (err) {
      console.error('Error adding habit: ', err);
    }
  };
  syncHabit();
};

export const addHabitToDB = async (
  habitName: string,
  habitDesc: string,
  habitTags: string[],
  user: string,
  setProfile: (profile: ProfileType) => void,
) => {
  let habitId = '';
  try {
    // Checks if habit name already exists in firestore
    const habitRef = await firestore()
      .collection('Habits')
      .where('name', '==', habitName.toLowerCase())
      .get();
    if (habitRef.docs.length === 0) {
      const newRef = await firestore().collection('Habits').doc();
      await newRef.set({
        name: habitName.toLowerCase(),
        users: [user],
        desc: habitDesc,
        tags: habitTags,
      });
      habitId = newRef.id;
    } else {
      habitId = habitRef.docs[0].id;
      const docRef = firestore().collection('Habits').doc(habitId);
      await docRef.update({
        users: firestore.FieldValue.arrayUnion(user),
      });
    }
    const userRef = await firestore().collection('Users').doc(user).get();
    const habitExists = userRef
      .data()
      ?.habits.find((obj: HabitType) => obj.habitId === habitId);
    if (!habitExists) {
      const date = new Date().toLocaleDateString('en-US');
      const progress: {[key: string]: boolean} = {};
      progress[date] = false;
      addHabit(
        {
          name: habitName,
          description: habitDesc,
          streak: 0,
          progress: progress,
          habitId: habitId,
          habitTags: habitTags,
        },
        user,
        setProfile,
      );
    } else {
      throw new Error('Habit already exists on this user.');
    }
  } catch (err) {
    console.error('Error adding habit to DB: ', err);
  }
};
