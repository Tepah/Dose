import React, {useEffect} from 'react';
import {Image, Pressable, Text, TextInput, View} from 'react-native';
import Styles from '../../components/Styles';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CloseButton} from '../../components/Close';
import auth from '@react-native-firebase/auth';
import {mockProfileList} from '../../test/mockProfile1';
import {selectImage} from '../../components/photo/selectImage';
import {createUserOnPress} from '../../components/auth/createUserOnPress';
import {ProfileType} from '../../components/types';
import createUserDoc from '../../components/auth/createUserDoc';
import {createEmailUser} from '../../components/auth/emailSignUp';
import {uploadProfilePic} from '../../components/photo/changeProfilePic';

export const GmailSignUpScreen = ({route}: any) => {
  const {user, googleCredential} = route.params;
  const [name, setName] = React.useState(user.name);
  const [birthday, setBirthday] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const onPress = () => {
    const created: boolean = createUserOnPress(
      selectedImage,
      user.email,
      'N/A',
      name,
      birthday,
      username,
    );
    if (created) {
      auth().signInWithCredential(googleCredential);
    }
  };

  useEffect(() => {
    if (created) {
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
      };
      createUserDoc(user);
      auth.().signInWithCredential(googleCredential);
    }
  }, [profilePicUrl]);

  const onPress = async () => {
    setCreated(
      await createUserOnPress(
        selectedImage,
        user.email,
        "",
        name,
        birthday,
        username,
      ),
    );
    setProfilePicUrl(await uploadProfilePic(selectedImage, username));
  };

  // TODO: Create password creation, also error handling like name size, etc.
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
