import * as React from 'react';
import {View, Text} from 'react-native';
import Calendar from '../components/Calendar';
import Styles from '../components/Styles';

const HomeScreen = () => {
  return (
    <View style={Styles.app}>
      <Calendar />
      <Text>Home Page</Text>
    </View>
  );
};

export default HomeScreen;
