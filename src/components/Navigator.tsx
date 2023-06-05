import * as React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import styles from '../components/Styles';

class Props {
  navigation: any;
}

const Navigator = ({navigation}: Props) => {
  return (
    <View style={styles.navigator}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text>Hello</Text>
        <Image source={require('../icons/home.svg')} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Social')}><Text>Hello</Text>
        <Image source={require('../icons/social.svg')} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Stats')}><Text>Hello</Text>
        <Image source={require('../icons/stats.svg')} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Settings')}><Text>Hello</Text>
        <Image source={require('../icons/settings.svg')} />
      </TouchableOpacity>
    </View>
  );
};

export default Navigator;
