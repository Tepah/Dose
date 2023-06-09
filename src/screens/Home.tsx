import * as React from 'react';
import {View, Text} from 'react-native';
import Calendar from '../components/Calendar';
import Styles from '../components/Styles';

const HomeScreen = () => {
  return (
    <>
      <Calendar />
      <View style={Styles.app}>
        <Text style={Styles.text}>Home Page</Text>
      </View>
    </>
  );
};

export default HomeScreen;
