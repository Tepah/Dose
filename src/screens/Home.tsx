import React, { useEffect, useRef, useState } from "react";
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
import {mockProfile1} from '../test/mockProfile1';
import EditHabitScreen from './Modals/EditHabit';

type HabitType = {
  name: string;
  description: string;
  streak: number;
};

/* TODO: add past date rendering, */
/*   add clickable past dates to track progress, but don't allow editing on past dates. */
/*   make dates have completion status icons. */
const SwipeableItem = ({
  type,
  habits,
  swipedHabits,
  setSwipedHabits,
  setHabits,
  setEditModalVisible,
  habit,
  setSelectedList,
  setCurrentHabitIndex,
  index,
}: {
  type: string;
  habits: {name: string; description: string; streak: number}[];
  swipedHabits: HabitType[];
  setSwipedHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  setHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  habit: HabitType;
  setSelectedList: React.Dispatch<React.SetStateAction<string>>;
  setCurrentHabitIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}) => {
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
  const handleLongPress = () => {
    setEditModalVisible(() => true);
    setCurrentHabitIndex(index);
    setSelectedList(type);
  };

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
      <Pressable
        key={index}
        style={Styles.habitButton}
        onLongPress={() => handleLongPress()}>
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
    </Animated.View>
  );
};

const HomeScreen = () => {
  const [habits, setHabits] = useState<HabitType[]>(mockProfile1.habits);
  const [swipedHabits, setSwipedHabits] = useState<HabitType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentHabit, setCurrentHabit] = useState<number>(0);
  const [selectedList, setSelectedList] = useState<string>('')

  // TODO: Different colors?
  const renderHabits = (type: string, list: HabitType[]) => {
    return list.map((habit: HabitType, index: number) => (
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
    ));
  };
  const addHabit = (habit: HabitType) => {
    setHabits([...habits, habit]);
  };

  const editHabit = (habit: HabitType, index: number) => {
    setHabits([...habits.slice(0, index), habit, ...habits.slice(index + 1)]);
  };

  return (
    <View style={Styles.app}>
      <Calendar />
      <ScrollView style={Styles.habitList}>
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
