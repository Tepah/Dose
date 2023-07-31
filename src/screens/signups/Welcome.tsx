import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Styles from '../../components/Styles';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppButton} from '../../components/Button';
import {GoogleButton} from '../../components/GoogleButton';
import {AppleSignIn} from '../../components/AppleButton';

export const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View style={[Styles.app]}>
      <View style={Styles.upperWelcomeContainer}>
        <Text style={Styles.text}>Welcome to dose!</Text>
      </View>
      <View style={[Styles.welcomeButtonContainer]}>
        <AppButton
          title={'Login'}
          onPress={() => navigation.navigate('Login')}
        />
        <AppButton
          onPress={() => navigation.navigate('Email Sign Up')}
          title={'Sign Up'}
        />
      </View>
      <View style={Styles.welcomeOtherSignInContainer}>
        <Text style={Styles.paragraphText}>or</Text>
        <GoogleButton />
        <AppleSignIn />
      </View>
    </View>
  );
};
