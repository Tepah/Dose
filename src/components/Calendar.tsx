import React, {useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import styles from './Styles';
import {useIsFocused} from '@react-navigation/native';

const horizontalPadding = 20;

const Calendar = () => {
  const isFocused = useIsFocused();
  const scrollViewRef = useRef(null);
  const months = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();
  const [date, setDate] = useState({
    day: currentDay,
    month: currentMonth,
    year: currentYear,
  });

  useEffect(() => {
    if (scrollViewRef.current && date.day - 1 >= 0) {
      const itemWidth =
        Dimensions.get('window').width - 0.02 * horizontalPadding;
      const scrollViewWidth =
        Dimensions.get('window').width - 0.04 * horizontalPadding;
      const itemPosition =
        (date.day - 1) * itemWidth + (itemWidth - scrollViewWidth) / 0.04;

      // @ts-ignore
      scrollViewRef.current.scrollTo({x: itemPosition, animated: false});
    }
  }, [date.day, daysArray, isFocused]);

  const daysArray = Array.from({length: months.June}, (_, index) => index + 1);
  const renderViews = () => {
    return daysArray.map(day => (
      <View key={day} style={innerStyles.item}>
        <Text
          style={[
            styles.text,
            day === date.day ? innerStyles.currentDay : innerStyles.day,
          ]}>
          {day}
        </Text>
      </View>
    ));
  };

  return (
    <View style={styles.calendarContainer}>
      <View>
        <Text style={styles.text}>{Object.keys(months)[date.month]}</Text>
      </View>
      <View style={innerStyles.scroll}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}>
          {renderViews()}
        </ScrollView>
      </View>
    </View>
  );
};

const innerStyles = StyleSheet.create({
  scroll: {
    AlignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  day: {
    fontSize: 20,
    color: 'grey',
  },
  currentDay: {
    fontSize: 20,
  },
  item: {
    width: '4%',
    paddingHorizontal: horizontalPadding,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Calendar;
