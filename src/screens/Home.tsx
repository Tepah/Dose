import * as React from 'react';
import {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Calendar from '../components/Calendar';
import Styles from '../components/Styles';

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
      <View key={index} style={Styles.habitContainer}>
        <Text style={Styles.text}>{habit}</Text>
      </View>
    ));
  };

  return (
    <View style={Styles.app}>
      <Calendar />
      <ScrollView style={Styles.habitList}>
        {renderHabits()}
        <View
          style={{
            backgroundColor: '#344966',
            marginTop: 10,
            width: 50,
            height: 50,
            borderRadius: 25,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={Styles.text}>+</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
