import * as React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import Styles from '../components/Styles';

const SocialScreen = () => {
  return (
    <View style={Styles.app}>
      <View style={Styles.header}>
        <Text style={[Styles.text, Styles.headerText]}>dose</Text>
        <View style={Styles.headerNav}>
          <Pressable>
            <Image source={require('../icons/search.png')} />
          </Pressable>
          <Pressable>
            <Image source={require('../icons/notification.png')} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SocialScreen;
