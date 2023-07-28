import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import Styles from '../../components/Styles';
import {createEmailUser} from '../../components/emailSignUp';


export const EmailSignInScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={[Styles.app]}>
      <Text style={Styles.text}>Email</Text>
      <TextInput
        style={Styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={Styles.text}>Password</Text>
      <TextInput

        style={Styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={Styles.button} onPress={() => createEmailUser(email, password)}>
        <Text style={Styles.text}>Sign up</Text>
      </Pressable>
    </View>
  );
}
