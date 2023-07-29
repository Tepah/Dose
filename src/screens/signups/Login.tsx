import {Text, TextInput, View} from 'react-native';
import Styles from '../../components/Styles';
import React from 'react';

export const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
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
    </View>
  );
};
