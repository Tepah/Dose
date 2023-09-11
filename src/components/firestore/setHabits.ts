import firestore from '@react-native-firebase/firestore';
import {HabitType, ProfileType} from '../types';
import {getProfileHabits} from './getHabits';
import React from 'react';

export const updateHabits = async (
  username: string,
  habits: HabitType[] | undefined,
) => {
  try {
    console.log('Updating habits: ', habits);
    if (habits) {
      const userRef = await firestore().collection('Users').doc(username).get();
      if (userRef.exists) {
        await firestore().collection('Users').doc(username).update({
          habits: habits,
        });
      }
    }
  } catch (err) {
    console.log('Error updating habits: ', err);
  }
};

export const syncHabit = async (
  username: string,
  date: any,
  habit: HabitType,
  setHabits: React.Dispatch<React.SetStateAction<HabitType[] | undefined>>,
  setSwipedHabits: React.Dispatch<React.SetStateAction<HabitType[]>>,
  setProfile: (profile: ProfileType) => void,
) => {
  try {
    const allHabits = await getProfileHabits(username);
    if (allHabits) {
      const habitIndex = allHabits.findIndex(
        obj => obj.habitId === habit.habitId,
      );
      allHabits[habitIndex].description = habit.description;
    }
    const userRef = firestore().collection('Users').doc(username);
    await userRef.update({habits: allHabits});
    if (allHabits) {
      const dateHabitsDone = allHabits.filter(
        (obj: HabitType) => !obj.progress[date],
      );
      setHabits(() => dateHabitsDone);
      const dateHabitsNotDone = allHabits.filter(
        (obj: HabitType) => obj.progress[date],
      );
      setSwipedHabits(() => dateHabitsNotDone);
    }
    const userDocs = await userRef.get();
    setProfile(userDocs.data() as ProfileType);
  } catch (err) {
    console.error('Error Editing habit: ', err);
  }
};
