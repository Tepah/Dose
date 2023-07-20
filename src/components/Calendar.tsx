import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import styles from './Styles';
import {useIsFocused} from '@react-navigation/native';

interface Props {
  dateChange: (date: string) => void;
}

/* TODO: Create a pull down calendar to change dates, maybe create a new color for dates that have completed tasks */
const Calendar = ({dateChange}: Props) => {
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
      const itemWidth = Dimensions.get('window').width / 6;
      const scrollViewWidth = 6 * itemWidth;
      const itemPosition =
        (date.day - 1) * itemWidth - scrollViewWidth / 2 + itemWidth;

      // @ts-ignore
      scrollViewRef.current.scrollTo({x: itemPosition, animated: false});
    }
  }, [date.day, isFocused]);

  useEffect(() => {
    onDatePress(`${currentMonth + 1}/${currentDay}/${currentYear}`);
  }, [isFocused]);

  const daysArray = Array.from(
    {length: Object.values(months)[date.month]},
    (_, index) => index + 1,
  );
  const onDatePress = (newDate: string) => {
    const [month, day, year] = newDate.split('/');
    if (
      currentMonth < parseInt(month, 10) - 1 ||
      currentYear < parseInt(year, 10) ||
      currentDay < parseInt(day, 10)
    ) {
      return;
    }
    dateChange(newDate);
    setDate({
      day: parseInt(day, 10),
      month: parseInt(month, 10) - 1,
      year: parseInt(year, 10),
    });
  };

  const renderViews = () => {
    return daysArray.map((day, index) => (
      <View key={index} style={innerStyles.item}>
        <Pressable
          style={day === date.day ? innerStyles.selected : innerStyles.notSelected}
          onPress={() => onDatePress(`${date.month + 1}/${day}/${date.year}`)}>
          <Text
            style={[
              styles.text,
              day === currentDay ? innerStyles.currentDay : innerStyles.day,
              {
                textAlign: 'center',
              },
            ]}>
            {day}
          </Text>
        </Pressable>
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
  notSelected: {
    aspectRatio: 1,
    padding: 8,
  },
  selected: {
    backgroundColor: '#F2F2F2',
    aspectRatio: 1,
    padding: 8,
    borderRadius: 100,
  },
  item: {
    width: Dimensions.get('window').width / 6,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default Calendar;
