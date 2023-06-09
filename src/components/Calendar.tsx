import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './Styles';

const Calendar = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDay();
  const [date, setDate] = useState({
    day: currentDay,
    month: currentMonth,
    year: currentYear,
  });

  useEffect(() => {
  }, [date]);

  return (
    <View style={styles.calendarContainer}>
      <Text style={styles.text}>{months[date.month]}</Text>
      <Text style={styles.text}>{date.day}</Text>
    </View>
  );
};

export default Calendar;
