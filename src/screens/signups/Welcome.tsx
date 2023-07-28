import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Styles from '../../components/Styles';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View style={[Styles.app, Styles.welcomeButtonContainer]}>
      <Pressable style={Styles.button}>
        <Text style={Styles.text}>Login</Text>
      </Pressable>
      <Pressable
        style={Styles.button}
        onPress={() => navigation.navigate('Sign Up')}>
        <Text style={Styles.text}>Sign Up</Text>
      </Pressable>
    </View>
  );
};
