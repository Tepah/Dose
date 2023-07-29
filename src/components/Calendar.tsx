import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './Styles';
import {useIsFocused} from '@react-navigation/native';
import {mockProfileList} from '../test/mockProfile1';
import {HabitType} from './types';
import Styles from './Styles';

interface Props {
  dateChange: (date: string) => void;
}

type DateType = {
  day: number;
  month: number;
  year: number;
};
// TODO: RN, you can click on month in calendar and it'll change if you close out of the calendar box
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
  const [date, setDate] = useState<DateType>({
    day: currentDay,
    month: currentMonth,
    year: currentYear,
  });
  const [monthYearModal, setMonthYearModal] = useState(false);

  useEffect(() => {
    if (scrollViewRef.current && date.day - 1 >= 0) {
      const itemWidth = Dimensions.get('window').width / 6;
      const scrollViewWidth = 6 * itemWidth;
      const itemPosition =
        (date.day - 1) * itemWidth - scrollViewWidth / 2 + itemWidth;

      // @ts-ignore
      scrollViewRef.current.scrollTo({x: itemPosition, animated: false});
    }
  }, [isFocused]);

  useEffect(() => {
    onDatePress(`${currentMonth + 1}/${currentDay}/${currentYear}`);
  }, [isFocused]);

  useEffect(() => {
    if (scrollViewRef.current && date.day - 1 >= 0) {
      const itemWidth = Dimensions.get('window').width / 6;
      const scrollViewWidth = 6 * itemWidth;
      const itemPosition =
        (date.day - 1) * itemWidth - scrollViewWidth / 2 + itemWidth;

      // @ts-ignore
      scrollViewRef.current.scrollTo({x: itemPosition, animated: false});
    }
  }, []);

  const daysArray = Array.from(
    {length: Object.values(months)[date.month]},
    (_, index) => index + 1,
  );
  const onDatePress = (newDate: string) => {
    const [month, day, year] = newDate.split('/');
    if (currentMonth === parseInt(month, 10) - 1) {
      if (currentYear < parseInt(year, 10) || currentDay < parseInt(day, 10)) {
        return;
      }
    }
    dateChange(newDate);
    setDate({
      day: parseInt(day, 10),
      month: parseInt(month, 10) - 1,
      year: parseInt(year, 10),
    });
  };

  const renderViews = () => {
    let habits = 0;
    let totalHabits = mockProfileList['@petah'].habits.length;
    return daysArray.map((day, index) => {
      habits = 0;
      mockProfileList['@petah'].habits.forEach((habit: HabitType) => {
        if (habit.progress[`${date.month + 1}/${day}/${date.year}`]) {
          habits += 1;
        }
      });
      return (
        <View key={index} style={innerStyles.item}>
          <Pressable
            style={
              day === date.day ? innerStyles.selected : innerStyles.notSelected
            }
            onPress={() =>
              onDatePress(`${date.month + 1}/${day}/${date.year}`)
            }>
            <Text
              style={[
                styles.text,
                day !== currentDay ||
                date.month !== currentMonth ||
                date.year !== currentYear
                  ? innerStyles.day
                  : day === date.day
                  ? innerStyles.currentDaySelected
                  : innerStyles.currentDay,
                {
                  textAlign: 'center',
                },
              ]}>
              {day}
            </Text>
            <View
              style={[
                innerStyles.completed,
                totalHabits === habits
                  ? innerStyles.fullyCompleted
                  : habits > 0
                  ? innerStyles.partiallyCompleted
                  : null,
              ]}
            />
          </Pressable>
        </View>
      );
    });
  };

  return (
    <View style={styles.calendarContainer}>
      <Pressable onPress={() => setMonthYearModal(true)}>
        <Text style={styles.text}>{Object.keys(months)[date.month]}</Text>
      </Pressable>
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
      <DatePicker
        months={Object.keys(months)}
        visible={monthYearModal}
        setVisible={setMonthYearModal}
        date={date}
        dateChange={onDatePress}
      />
    </View>
  );
};

interface datePickerProps {
  months: string[];
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  date: DateType;
  dateChange: (date: string) => void;
}

const DatePicker = (props: datePickerProps) => {
  const [startMonth, startDay, startYear] =
    mockProfileList['@petah'].startDate.split('/');
  const [selectedYear, setSelectedYear] = useState(props.date.year);
  const years = [];
  for (
    let year = parseInt(startYear, 10);
    year <= new Date().getFullYear();
    year++
  ) {
    years.push(year);
  }

  useEffect(() => {
    setSelectedYear(props.date.year);
  }, [props.visible]);

  const renderMonths = props.months.map((month, index) => {
    return (
      <Pressable
        key={index}
        style={styles.monthContainer}
        onPress={() => changeDate(index)}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Text style={[styles.paragraphText, {textAlign: 'center'}]}>
          {month}
        </Text>
      </Pressable>
    );
  });
  const renderYears = years.map((year, index) => {
    return (
      <Pressable
        key={index}
        style={styles.yearContainer}
        onPress={() => setSelectedYear(year)}>
        <Text
          style={[
            styles.text,
            selectedYear !== year ? innerStyles.notSelectedYear : null,
          ]}>
          {year}
        </Text>
      </Pressable>
    );
  });
  const changeDate = (month: number) => {
    props.dateChange(`${month + 1}/1/${selectedYear}`);
    if (new Date().getFullYear() === selectedYear) {
      if (new Date().getMonth() < month) {
        return;
      }
    }

    props.setVisible(false);
  };
  return (
    <Modal visible={props.visible} transparent={true}>
      <View style={styles.datePickerContainer}>
        <ScrollView horizontal style={styles.yearPicker}>
          {renderYears}
        </ScrollView>
        <View style={styles.monthPicker}>{renderMonths}</View>
      </View>
      <TouchableWithoutFeedback onPress={() => props.setVisible(false)}>
        <View style={Styles.inputFieldBackground}></View>
      </TouchableWithoutFeedback>
    </Modal>
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
  currentDaySelected: {
    fontSize: 20,
    color: 'black',
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
    padding: 5,
    borderRadius: 100,
  },
  item: {
    width: Dimensions.get('window').width / 6,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  fullyCompleted: {
    backgroundColor: '#00FF00',
    aspectRatio: 1,
    borderRadius: 100,
  },
  partiallyCompleted: {
    backgroundColor: '#FF0000',
    aspectRatio: 1,
    borderRadius: 100,
  },
  completed: {
    margin: 3,
    padding: 3,
    aspectRatio: 1,
    alignSelf: 'center',
  },
  notSelectedYear: {
    fontSize: 24,
    color: 'grey',
  },
});

export default Calendar;
