import * as React from 'react';
import {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  PanResponder, Pressable
} from "react-native";
import Calendar from '../components/Calendar';
import Styles from '../components/Styles';
import AddHabitScreen from './Modals/AddHabit';
import {mockProfile1} from '../test/mockProfile1';

type HabitType = {
  name: string;
  description: string;
  streak: number;
};

/* TODO: Incorporate visible talley marks for streaks, add past date rendering, */
/*   add clickable past dates to track progress, but don't allow editing on past dates. */
/*   make dates have completion status icons. */
const SwipeableItem = ({
  type,
  habits,
  swipedHabits,
  setSwipedHabits,
  setHabits,
  habit,
  index,
}: {
  type: string;
  habits: {name: string; description: string; streak: number}[];
  swipedHabits: HabitType[];
  setSwipedHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  setHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  habit: HabitType;
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
    console.log('once');
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
          Streak: {habit.streak} days
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const HomeScreen = () => {
  const [habits, setHabits] = useState<HabitType[]>(mockProfile1.habits);
  const [swipedHabits, setSwipedHabits] = useState<HabitType[]>([]);

  // TODO: Different colors?
  const renderHabits = (type: string, list: HabitType[]) => {
    return list.map((habit: HabitType, index) => (
      <SwipeableItem
        type={type}
        habits={habits}
        swipedHabits={swipedHabits}
        setSwipedHabits={setSwipedHabits}
        setHabits={setHabits}
        habit={habit}
        index={index}
      />
    ));
  };
  const addHabit = (habit: HabitType) => {
    setHabits([...habits, habit]);
  };

  return (
    <View style={Styles.app}>
      <Calendar />
      <ScrollView style={Styles.habitList}>
        {renderHabits('current', habits)}
        <AddHabitScreen addHabit={addHabit} />
        {renderHabits('swiped', swipedHabits)}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
