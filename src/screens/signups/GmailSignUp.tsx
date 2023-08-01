import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import Styles from '../../components/Styles';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CloseButton} from '../../components/Close';
import createUserDoc from '../../components/auth/createUserDoc';
import {ProfileType} from '../../components/types';
import {createEmailUser} from '../../components/auth/emailSignUp';
import auth from '@react-native-firebase/auth';

export const GmailSignUpScreen = ({route}: any) => {
  const {user, googleCredential} = route.params;
  const [email, setEmail] = React.useState(user.email);
  const [name, setName] = React.useState(user.name);
  const [birthday, setBirthday] = React.useState('');
  const [username, setUsername] = React.useState('');
  // To get typescript to play nice, use the following:
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const onPress = () => {
    createEmailUserOnPress();
    auth().signInWithCredential(googleCredential);
  }
  const createEmailUserOnPress = () => {
    if (email === '' || name === '' || birthday === '' || username === '') {
      console.log(
        'missing parameters: ' +
          (!email ? 'email ' : '') +
          (!name ? 'name ' : '') +
          (!birthday ? 'birthday ' : '') +
          (!username ? 'username ' : ''),
      );
      return;
    }
    const newUserData: ProfileType = {
      username: '@' + username.toLowerCase(),
      name: name.toLowerCase(),
      birthday: birthday,
      email: email.toLowerCase(),
      private: false,
      followers: [],
      following: [],
      habits: [],
      description: '',
      startDate: new Date().toLocaleDateString('en-US'),
      profilePic: '',
    };
    createUserDoc(newUserData);
    navigation.navigate('Welcome');
  };
  // TODO: Create password creation, also error handling like name size, etc.
  return (
    <View style={[Styles.app]}>
      <Text style={Styles.text}>Email</Text>
      <TextInput style={Styles.input} value={email} onChangeText={setEmail} />
      <Text style={Styles.text}>Name</Text>
      <TextInput style={Styles.input} value={name} onChangeText={setName} />
      <Text style={Styles.text}>User Name</Text>
      <TextInput
        style={Styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={Styles.text}>Birthday</Text>
      {/*Make this a date system like [mm] / [dd] / [yyyy]*/}
      <TextInput
        style={Styles.input}
        value={birthday}
        onChangeText={setBirthday}
      />
      <Pressable style={Styles.button} onPress={onPress}>
        <Text style={Styles.text}>Sign up</Text>
      </Pressable>
      <CloseButton
        type={'back'}
        closeFunction={() => navigation.navigate('Welcome')}
      />
    </View>
  );
};
