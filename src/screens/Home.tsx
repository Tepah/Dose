import * as React from 'react';
import {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Animated,
  PanResponder,
} from 'react-native';
import Calendar from '../components/Calendar';
import Styles from '../components/Styles';
import AddHabitScreen from './Modals/AddHabit';

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
  habits: string[];
  swipedHabits: string[];
  setSwipedHabits: React.Dispatch<React.SetStateAction<string[]>>;
  setHabits: React.Dispatch<React.SetStateAction<string[]>>;
  habit: string;
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
      <Text style={type === 'current' ? Styles.text : Styles.doneText}>
        {habit}
      </Text>
    </Animated.View>
  );
};

const HomeScreen = () => {
  const [habits, setHabits] = useState<string[]>([
    'Habit 1',
    'Habit 2',
    'Habit 3',
  ]);
  const [swipedHabits, setSwipedHabits] = useState<string[]>([]);

  // TODO: Different colors?
  const renderHabits = (type: string, list: string[]) => {
    return list.map((habit, index) => (
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

  const addHabit = (name: string, weekly: boolean) => {
    setHabits([...habits, name]);
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
