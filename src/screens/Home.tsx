import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, Pressable} from 'react-native';
import Calendar from '../components/Calendar';
import Styles from '../components/Styles';
import EditHabitScreen from './Modals/EditHabit';
import {HabitType, ProfileType} from '../components/types';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {NonSwipeableItem, SwipeableItem} from '../components/Swipables';
import {getProfileHabits} from '../components/firestore/getHabits';
import UserContext from '../Contexts/UserContext';

/* TODO: add past date rendering, */
/*   add clickable past dates to track progress, but don't allow editing on past dates. */
/*   make dates have completion status icons. */

const HomeScreen = () => {
  const {username, profile, setProfile} = useContext(UserContext);
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

  const setNewDay = async () => {
    try {
      const newDay = new Date().toLocaleDateString('en-US');
      const allHabits = await getProfileHabits(username);
      const today = new Date();
      const oneDayBefore = new Date(today);
      oneDayBefore.setDate(today.getDate() - 1);
      const formattedDayBeforeDate = oneDayBefore.toLocaleDateString('en-US');
      if (allHabits) {
        allHabits.forEach((habit: HabitType) => {
          if (habit.progress[newDay] === undefined) {
            habit.progress[newDay] = false;
          }
          if (
            (habit.progress[formattedDayBeforeDate] === undefined ||
              !habit.progress[formattedDayBeforeDate]) &&
            habit.streak > 1
          ) {
            habit.streak = 0;
          }
        });
      }
    } catch (err) {
      console.error('Error setting new day: ', err);
    }
  };

  useEffect(() => {
    const newDay = new Date().toLocaleDateString('en-US');
    setCurrentDate(() => newDay);
    setDate(() => currentDate);
    setNewDay();
  }, [currentDate, isFocused]);

  useEffect(() => {
    getHabits();
    setLoading(false);
  }, [date, profile]);

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

  const editHabit = (habit: HabitType, editType: string) => {
    const syncHabit = async () => {
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
    if (editType === 'edit') {
      syncHabit();
    } else if (editType === 'delete') {
      getHabits();
    }
  };

  const dateChange = (newDate: string) => {
    setDate(() => newDate);
  };

  const habitList = (
    <ScrollView style={Styles.habitList} keyboardShouldPersistTaps="always">
      {habits && habits.length > 0 ? renderHabits('current', habits) : null}
      <HabitPageNavigator />
      {(habits && currentHabit < habits.length && selectedList === 'current') ||
      (swipedHabits &&
        currentHabit < swipedHabits.length &&
        selectedList === 'swiped') ? (
        <EditHabitScreen
          username={username}
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

const HabitPageNavigator = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={Styles.addButton}
      onPress={() => navigation.navigate('Add Habits')}>
      <Image
        source={require('../icons/add.png')}
        style={{
          width: 60,
          height: 60,
          alignSelf: 'center',
        }}
        resizeMode="contain"
      />
    </Pressable>
  );
}

export default HomeScreen;
