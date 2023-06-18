import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import styles from './Styles';

const Calendar = () => {
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
  const currentDay = currentDate.getDay();
  const [date, setDate] = useState({
    day: currentDay,
    month: currentMonth,
    year: currentYear,
  });

  const daysArray = Array.from({length: months.June}, (_, index) => index + 1);
  const renderViews = () => {
    return daysArray.map(day => (
      <View key={day} style={innerStyles.item}>
        <View style={innerStyles.item}>
          <Text style={[styles.text, innerStyles.day]}>{day}</Text>
        </View>
        {/* Add your code here to customize the view for each day */}
      </View>
    ));
  };

  useEffect(() => {}, [date]);

  return (
    <View style={styles.calendarContainer}>
      <View>
        <Text style={styles.text}>{Object.keys(months)[date.month]}</Text>
      </View>
      <View style={innerStyles.scroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Calendar;
