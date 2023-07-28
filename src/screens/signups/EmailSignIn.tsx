import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import Styles from '../../components/Styles';
import {createEmailUser} from '../../components/emailSignUp';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


export const EmailSignInScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // To get typescript to play nice, use the following:
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const createEmailUserOnPress = () => {
    createEmailUser(email, password);
    navigation.navigate('Welcome');
  };

  return (
    <View style={[Styles.app]}>
      <Text style={Styles.text}>Email</Text>
      <TextInput style={Styles.input} value={email} onChangeText={setEmail} />
      <Text style={Styles.text}>Password</Text>
      <TextInput
        style={Styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={Styles.button} onPress={createEmailUserOnPress}>
        <Text style={Styles.text}>Sign up</Text>
      </Pressable>
    </View>
  );
};
