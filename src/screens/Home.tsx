import * as React from 'react';
import {useRef, useState} from 'react';
import {View, Text, ScrollView, Image, Pressable, Animated, PanResponder} from 'react-native';
import Calendar from '../components/Calendar';
import Styles from '../components/Styles';

const SwipeableItem = ({habit, index}: {habit: string; index: number}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {dx: pan.x},
      ],
      {useNativeDriver: false}
    ),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: {x: 0, y: 0},
        useNativeDriver: false,
      }).start();
    },
  });

  return (
    <Animated.View
      key={index}
      style={[Styles.habitContainer, {transform: [{translateX: pan.x}]}]}
      {...panResponder.panHandlers}>
      <Text style={Styles.text}>{habit}</Text>
    </Animated.View>
  );
};

/* TODO: Create a habit page where you can add habits and select them off from a list
 *   Create a way to swipe on habits
 *   Create a way to undo swipes*/
const HomeScreen = () => {
  const [habits, setHabits] = useState<string[]>([
    'Habit 1',
    'Habit 2',
    'Habit 3',
  ]);

  // TODO: Different colors?
  const renderHabits = () => {
    return habits.map((habit, index) => (
      <SwipeableItem habit={habit} index={index} />
    ));
  };
  // TODO: Create a page to add habits
  const onPressAdd = () => {
    setHabits([...habits, 'New Habit']);
  };
  return (
    <View style={Styles.app}>
      <Calendar />
      <ScrollView style={Styles.habitList}>
        {renderHabits()}
        <Pressable onPress={onPressAdd}>
          <Image
            source={require('../icons/add.png')}
            style={{
              width: 50,
              height: 50,
              alignSelf: 'center',
              marginVertical: 10,
            }}
            resizeMode="contain"
          />
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
