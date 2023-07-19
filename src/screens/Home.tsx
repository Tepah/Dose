import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  PanResponder,
  Pressable,
} from 'react-native';
import Calendar from '../components/Calendar';
import Styles from '../components/Styles';
import AddHabitScreen from './Modals/AddHabit';
import {mockProfileList} from '../test/mockProfile1';
import EditHabitScreen from './Modals/EditHabit';
import {HabitType} from '../components/types';
import {useIsFocused} from '@react-navigation/native';

/* TODO: add past date rendering, */
/*   add clickable past dates to track progress, but don't allow editing on past dates. */
/*   make dates have completion status icons. */

interface SwipeableItemProps {
  type: string;
  habits: HabitType[];
  swipedHabits: HabitType[];
  setSwipedHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  setHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedList: React.Dispatch<React.SetStateAction<string>>;
  setCurrentHabitIndex: React.Dispatch<React.SetStateAction<number>>;
  habit: HabitType;
  index: number;
}
const SwipeableItem = ({
  type,
  habits,
  swipedHabits,
  setSwipedHabits,
  setHabits,
  setEditModalVisible,
  setSelectedList,
  setCurrentHabitIndex,
  habit,
  index,
}: SwipeableItemProps) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dx: pan.x}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: {x: 0, y: 0},
        useNativeDriver: false,
      }).start();
      if (type === 'current') {
        setHabits([...habits.slice(0, index), ...habits.slice(index + 1)]);
        setSwipedHabits([...swipedHabits, habit]);
      } else if (type === 'swiped') {
        setSwipedHabits([
          ...swipedHabits.slice(0, index),
          ...swipedHabits.slice(index + 1),
        ]);
        setHabits([...habits, habit]);
      }
    },
  });

  return (
    <Animated.View
      key={index}
      style={[
        type === 'current'
          ? Styles.habitContainer
          : Styles.habitContainerSwiped,
        {transform: [{translateX: pan.x}]},
      ]}
      {...panResponder.panHandlers}>
      <RenderHabitButton
        habit={habit}
        index={index}
        type={type}
        setEditModalVisible={setEditModalVisible}
        setCurrentHabitIndex={setCurrentHabitIndex}
        setSelectedList={setSelectedList}
      />
    </Animated.View>
  );
};

const NonSwipeableItem = ({
  type,
  habit,
  index,
  setEditModalVisible,
  setSelectedList,
  setCurrentHabitIndex,
}: {
  type: string;
  habit: HabitType;
  index: number;
  setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedList: React.Dispatch<React.SetStateAction<string>>;
  setCurrentHabitIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <View
      key={index}
      style={[
        type === 'current'
          ? Styles.habitContainer
          : Styles.habitContainerSwiped,
      ]}>
      <RenderHabitButton
        habit={habit}
        index={index}
        type={type}
        setEditModalVisible={setEditModalVisible}
        setCurrentHabitIndex={setCurrentHabitIndex}
        setSelectedList={setSelectedList}
      />
    </View>
  );
};

const RenderHabitButton = ({
  habit,
  index,
  type,
  setEditModalVisible,
  setCurrentHabitIndex,
  setSelectedList,
}: {
  habit: HabitType;
  index: number;
  type: string;
  setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentHabitIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedList: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Pressable
      key={index}
      style={Styles.habitButton}
      onLongPress={() =>
        handleLongPress(
          setEditModalVisible,
          setCurrentHabitIndex,
          setSelectedList,
          index,
          type,
        )
      }>
      <Text style={type === 'current' ? Styles.text : Styles.doneText}>
        {habit.name}
      </Text>
      <Text
        style={
          type === 'current'
            ? [Styles.text, Styles.streakText]
            : [Styles.text, Styles.doneStreakText]
        }>
        {habit.streak > 0 ? (
          <Text>Streak: {habit.streak} days</Text>
        ) : (
          <Text>Start this today!</Text>
        )}
      </Text>
    </Pressable>
  );
};

const handleLongPress = (
  setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentHabitIndex: React.Dispatch<React.SetStateAction<number>>,
  setSelectedList: React.Dispatch<React.SetStateAction<string>>,
  index: number,
  type: string,
) => {
  setEditModalVisible(() => true);
  setCurrentHabitIndex(index);
  setSelectedList(type);
};

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const [habits, setHabits] = useState<HabitType[]>(
    mockProfileList['@petah'].habits,
  );
  const [swipedHabits, setSwipedHabits] = useState<HabitType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentHabit, setCurrentHabit] = useState<number>(0);
  const [selectedList, setSelectedList] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toLocaleDateString('en-US'),
  );

  useEffect(() => {
    const newDay = new Date().toLocaleDateString('en-US');
    setCurrentDate(() => newDay);
    setDate(() => currentDate);
    habits.forEach((habit: HabitType) => {
      if (habit.progress[newDay] === undefined) {
        habit.progress[newDay] = false;
      }
    });
  }, [currentDate, isFocused]);

  useEffect(() => {
    const dateHabitsDone = mockProfileList['@petah'].habits.filter(
      (habit: HabitType) => !habit.progress[date],
    );
    setHabits(() => dateHabitsDone);
    const dateHabitsNotDone = mockProfileList['@petah'].habits.filter(
      (habit: HabitType) => habit.progress[date],
    );
    setSwipedHabits(() => dateHabitsNotDone);
  }, [date]);

  const renderHabits = (type: string, list: HabitType[]) => {
    const checkDate = currentDate === date;
    return list.map((habit: HabitType, index: number) =>
      checkDate ? (
        <SwipeableItem
          type={type}
          habits={habits}
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
    setHabits([...habits, habit]);
  };

  const editHabit = (habit: HabitType, index: number) => {
    setHabits([...habits.slice(0, index), habit, ...habits.slice(index + 1)]);
  };

  const dateChange = (newDate: string) => {
    setDate(() => newDate);
  };

  return (
    <View style={Styles.app}>
      <Calendar dateChange={dateChange} />
      <ScrollView style={Styles.habitList} keyboardShouldPersistTaps="always">
        {renderHabits('current', habits)}
        <AddHabitScreen addHabit={addHabit} />
        {(currentHabit < habits.length && selectedList === 'current') ||
        (currentHabit < swipedHabits.length && selectedList === 'swiped') ? (
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
    </View>
  );
};

export default HomeScreen;
