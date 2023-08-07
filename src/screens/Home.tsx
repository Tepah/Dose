import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Calendar from '../components/Calendar';
import Styles from '../components/Styles';
import AddHabitScreen from './Modals/AddHabit';
import EditHabitScreen from './Modals/EditHabit';
import {HabitType, ProfileType} from '../components/types';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {NonSwipeableItem, SwipeableItem} from '../components/Swipables';
import {getProfileHabits} from '../components/firestore/getHabits';

/* TODO: add past date rendering, */
/*   add clickable past dates to track progress, but don't allow editing on past dates. */
/*   make dates have completion status icons. */


const HomeScreen = ({route}: any) => {
  const username = route.params?.username;
  const isFocused = useIsFocused();
  const [habits, setHabits] = useState<HabitType[] | undefined>([]);
  const [swipedHabits, setSwipedHabits] = useState<HabitType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentHabit, setCurrentHabit] = useState<number>(0);
  const [selectedList, setSelectedList] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toLocaleDateString('en-US'),
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const newDay = new Date().toLocaleDateString('en-US');
    setCurrentDate(() => newDay);
    setDate(() => currentDate);
    if (habits) {
      habits.forEach((habit: HabitType) => {
        if (habit.progress[newDay] === undefined) {
          habit.progress[newDay] = false;
        }
      });
    }
  }, [currentDate, isFocused]);

  useEffect(() => {
    getHabits();
  }, [date]);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [habits, swipedHabits]);

  const getHabits = async () => {
    try {
      const fullHabitsList = await getProfileHabits(username);
      if (fullHabitsList) {
        const dateHabitsDone = fullHabitsList.filter(
          (habit: HabitType) => !habit.progress[date],
        );
        setHabits(() => dateHabitsDone);
        const dateHabitsNotDone = fullHabitsList.filter(
          (habit: HabitType) => habit.progress[date],
        );
        setSwipedHabits(() => dateHabitsNotDone);
      }
    } catch (err) {
      console.error('Error getting habits: ', err);
    }
  };

  const renderHabits = (type: string, list: HabitType[]) => {
    const checkDate = currentDate === date;
    return list.map((habit: HabitType, index: number) =>
      checkDate ? (
        <SwipeableItem
          key={index}
          type={type}
          habits={habits}
          username={username}
          swipedHabits={swipedHabits}
          setSwipedHabits={setSwipedHabits}
          setHabits={setHabits}
          setEditModalVisible={setEditModalVisible}
          habit={habit}
          setSelectedList={setSelectedList}
          setCurrentHabitIndex={setCurrentHabit}
          index={index}
        />
      ) : (
        <NonSwipeableItem
          key={index}
          type={type}
          habit={habit}
          index={index}
          setEditModalVisible={setEditModalVisible}
          setSelectedList={setSelectedList}
          setCurrentHabitIndex={setCurrentHabit}
        />
      ),
    );
  };

  const addHabit = (habit: HabitType) => {
    setHabits(habits ? [...habits, habit] : [habit]);
    const syncHabit = async () => {
      try {
        const query = await firestore().collection('Users').doc(username).get();
        if (query.exists) {
          const profile: ProfileType = query.data() as ProfileType;
          profile.habits.push(habit);
          await firestore().collection('Users').doc(username).update(profile);
        }
      } catch (err) {
        console.error('Error adding habit: ', err);
      }
    };
    syncHabit();
  };

  const editHabit = (habit: HabitType, index: number) => {
    if (habits) {
      setHabits([...habits.slice(0, index), habit, ...habits.slice(index + 1)]);
    }
  };

  const dateChange = (newDate: string) => {
    setDate(() => newDate);
  };

  const habitList = (
    <ScrollView style={Styles.habitList} keyboardShouldPersistTaps="always">
      {habits && habits.length > 0 ? renderHabits('current', habits) : null}
      <AddHabitScreen addHabit={addHabit} user={username} />
      {(habits && currentHabit < habits.length && selectedList === 'current') ||
      (swipedHabits &&
        currentHabit < swipedHabits.length &&
        selectedList === 'swiped') ? (
        <EditHabitScreen
          editHabit={editHabit}
          habits={
            selectedList === 'current'
              ? habits
              : selectedList === 'swiped'
              ? swipedHabits
              : []
          }
          currentHabitIndex={currentHabit}
          visible={editModalVisible}
          setVisible={setEditModalVisible}
          selectedList={selectedList}
        />
      ) : null}
      {renderHabits('swiped', swipedHabits)}
    </ScrollView>
  );

  return (
    <View style={Styles.app}>
      <Calendar dateChange={dateChange} />
      {loading ? (
        <View>
          <View style={Styles.habitButton}>
            <Text style={Styles.text}>Loading...</Text>
          </View>
        </View>
      ) : (
        habitList
      )}
    </View>
  );
};

export default HomeScreen;
