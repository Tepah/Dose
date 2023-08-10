import React, {useEffect} from 'react';
import {Image, Pressable, Text, TextInput, View} from 'react-native';
import Styles from '../../components/Styles';
import {createEmailUser} from '../../components/auth/emailSignUp';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CloseButton} from '../../components/Close';
import {mockProfileList} from '../../test/mockProfile1';
import {selectImage} from '../../components/photo/selectImage';
import {createUserOnPress} from '../../components/auth/createUserOnPress';
import {uploadProfilePic} from '../../components/photo/changeProfilePic';
import {ProfileType} from '../../components/types';
import createUserDoc from '../../components/auth/createUserDoc';
import profile from '../Profile';

export const EmailSignUpScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [birthday, setBirthday] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [created, setCreated] = React.useState<boolean | undefined>(false);
  const [profilePicUrl, setProfilePicUrl] = React.useState<string | null>(null);
  // To get typescript to play nice, use the following:
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    if (created && !profilePicUrl) {
      const changeProfilePic = async () => {
        setProfilePicUrl(await uploadProfilePic(selectedImage, '@' + username));
      };
      changeProfilePic();
    }
    if (profilePicUrl && created) {
      const user: ProfileType = {
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
        profilePic: profilePicUrl,
        posts: [],
      };
      createUserDoc(user);
      createEmailUser(email, password);
    }
  }, [created, profilePicUrl]);

  const onPress = async () => {
    setCreated(
      await createUserOnPress(
        selectedImage,
        email,
        password,
        name,
        birthday,
        username,
      ),
    );
  };

  // TODO: Create password creation, also error handling
  return (
    <View style={[Styles.app]}>
      <View style={Styles.settingContainerTall}>
        <Pressable
          style={Styles.changeProfilePic}
          onPress={() => selectImage(setSelectedImage)}>
          {selectedImage === null ? (
            <Image
              source={mockProfileList['@petah'].profilePic}
              style={Styles.profileStatsImage}
            />
          ) : (
            <Image
              source={{uri: selectedImage}}
              style={Styles.profileStatsImage}
            />
          )}
          <View style={Styles.editPicIcon}>
            <Image source={require('../../icons/pencil.png')} />
          </View>
        </Pressable>
        <Text style={Styles.paragraphText}>Profile Picture</Text>
      </View>
      <Text style={Styles.text}>Email</Text>
      <TextInput style={Styles.input} value={email} onChangeText={setEmail} />
      <Text style={Styles.text}>Password</Text>
      <TextInput
        style={Styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
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
