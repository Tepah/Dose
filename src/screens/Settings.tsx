import * as React from 'react';
import {View, Text} from 'react-native';
import Navigator from '../components/Navigator';
import Styles from '../components/Styles';

class Props {
  navigation: any;
}
const SettingsScreen = ({navigation}: Props) => {
  return (
    <View style={Styles.app}>
      <Text>Stats Page</Text>
      <Navigator navigation={navigation} />
    </View>
  );
};

export default SettingsScreen;
