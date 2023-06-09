import React from 'react';
import {View, Text} from 'react-native';

const Calendar = () => {
  const currentDate = new Date();
  const [date, setDate] = React.useState(currentDate.toDateString());

  return (
    <View>
      <Text>{date}</Text>
    </View>
  );
};

export default Calendar;
