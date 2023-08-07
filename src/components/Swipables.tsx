import {HabitType} from './types';
import React, {useRef} from 'react';
import {Animated, PanResponder, Pressable, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Styles from './Styles';
import { getProfileHabits } from './firestore/getHabits';

interface SwipeableItemProps {
  type: string;
  habits: HabitType[] | undefined;
  username: string;
  swipedHabits: HabitType[];
  setSwipedHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  setHabits: React.Dispatch<React.SetStateAction<HabitType[] | undefined>>;
  setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedList: React.Dispatch<React.SetStateAction<string>>;
  setCurrentHabitIndex: React.Dispatch<React.SetStateAction<number>>;
  habit: HabitType;
  index: number;
}
export const SwipeableItem = ({
  type,
  habits,
  username,
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

  const updateHabitProgress = async () => {
    try {
      const allHabits = await getProfileHabits(username);
      const date = new Date().toLocaleDateString('en-US');
      if (allHabits) {
        const habitIndex = allHabits.findIndex(
          obj => JSON.stringify(obj) === JSON.stringify(habit),
        );
        allHabits[habitIndex].progress[date] =
          !allHabits[habitIndex].progress[date];
      }
      await firestore()
        .collection('Users')
        .doc(username)
        .update({habits: allHabits});
    } catch (err) {
      console.error('Error updating habit: ', err);
    }
  };

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
      if (habits && type === 'current') {
        setHabits([...habits.slice(0, index), ...habits.slice(index + 1)]);
        setSwipedHabits([...swipedHabits, habit]);
        updateHabitProgress();
      } else if (habits && type === 'swiped') {
        setSwipedHabits([
          ...swipedHabits.slice(0, index),
          ...swipedHabits.slice(index + 1),
        ]);
        setHabits([...habits, habit]);
        updateHabitProgress();
      }
    },
  });

  return (
    <Animated.View
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

export const NonSwipeableItem = ({
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
