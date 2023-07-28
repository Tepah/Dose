import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Styles from '../../components/Styles';
import {useNavigation} from '@react-navigation/native';

export const SignUpScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={Styles.app}>
      <Pressable style={Styles.button} onPress={() => navigation.navigate('Email Sign Up')}>
        <Text style={Styles.text}>Sign Up with Email</Text>
      </Pressable>
      <Pressable style={Styles.button}>
        <Text style={Styles.text}>Sign Up with Google</Text>
      </Pressable>
    </View>
  );
};
