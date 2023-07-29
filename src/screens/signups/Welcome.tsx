import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Styles from '../../components/Styles';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {gmailSignUp} from '../../components/auth/gmailSignUp';
import {AppButton} from '../../components/Button';

export const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View style={[Styles.app]}>
      <View style={[Styles.welcomeButtonContainer]}>
        <AppButton
          title={'Login'}
          onPress={() => navigation.navigate('Login')}
        />
        <AppButton
          onPress={() => navigation.navigate('Sign Up')}
          title={'Sign Up'}
        />
      </View>
      <Text style={Styles.paragraphText}>or</Text>
      <AppButton onPress={gmailSignUp} title={'Sign in with google'} />
    </View>
  );
};
