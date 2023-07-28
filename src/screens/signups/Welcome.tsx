import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Styles from '../../components/Styles';
import {useNavigation} from '@react-navigation/native';

export const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={[Styles.app, Styles.welcomeButtonContainer]}>
      <Pressable style={Styles.button}>
        <Text style={Styles.text}>Login</Text>
      </Pressable>
      <Pressable style={Styles.button} onPress={() => navigation.navigate('Sign Up')}>
        <Text style={Styles.text}>Sign Up</Text>
      </Pressable>
    </View>
  );
};
