import {Text, TextInput, View} from 'react-native';
import Styles from '../../components/Styles';
import React from 'react';
import {AppButton} from '../../components/Button';
import {emailSignIn} from '../../components/auth/emailSignIn';
import {CloseButton} from '../../components/Close';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // TODO: Send out error messages and format page
  return (
    <View style={Styles.app}>
      <Text style={Styles.text}>Email</Text>
      <TextInput
        style={Styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder={'Email'}
        keyboardType={'email-address'}
      />
      <Text style={Styles.text}>Password</Text>
      <TextInput
        style={Styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder={'Password'}
        secureTextEntry={true}
      />
      <AppButton onPress={() => emailSignIn(email, password)} title={'Login'} />
      <CloseButton
        type={'back'}
        closeFunction={() => navigation.navigate('Welcome')}
      />
    </View>
  );
};
