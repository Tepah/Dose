import React, {useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import styles from './Styles';
import {useIsFocused} from '@react-navigation/native';

/* TODO: Create a pull down calendar to change dates, maybe create a new color for dates that have completed tasks */
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

  // @ts-ignore
  useEffect(() => {
    if (scrollViewRef.current && date.day - 1 >= 0) {
      const itemWidth = Dimensions.get('window').width / 6;
      const scrollViewWidth = 6 * itemWidth;
      const itemPosition =
        (date.day - 1) * itemWidth - scrollViewWidth / 2 + itemWidth;

      // @ts-ignore
      scrollViewRef.current.scrollTo({x: itemPosition, animated: false});
    }
  }, [date.day, isFocused]);

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
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {renderViews()}
          </View>
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
    width: Dimensions.get('window').width / 6,
    paddingVertical: 5,
    alignItems: 'flex-end',
  },
});

export default Calendar;
