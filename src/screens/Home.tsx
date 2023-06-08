import * as React from 'react';
import {View, Text} from 'react-native';
import Navigator from '../components/Navigator';
import Styles from '../components/Styles';

class Props {
  navigation: any;
}
const HomeScreen = ({navigation}: Props) => {
  return (
    <View style={Styles.app}>
      <Text>Home Page</Text>
    </View>
  );
};

export default HomeScreen;
