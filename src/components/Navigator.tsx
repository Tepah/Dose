import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
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
        <Image
          style={styles.icons}
          source={require('../icons/home.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Social')}>
        <Image
          style={styles.icons}
          source={require('../icons/social.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Stats')}>
        <Image
          style={styles.icons}
          source={require('../icons/stats.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Settings')}>
        <Image
          style={styles.icons}
          source={require('../icons/settings.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Navigator;
