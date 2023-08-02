import React, {useEffect} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import Styles from '../../components/Styles';
import {CloseButton} from '../../components/Close';
import {ProfileType} from '../../components/types';
import {AppButton} from '../../components/Button';
import {signOut} from '../../components/auth/signOut';
import {mockProfileList} from '../../test/mockProfile1';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {uploadProfilePic} from '../../components/photo/changeProfilePic';
import {updateUser} from '../../components/updateUser';
import {selectImage} from '../../components/photo/selectImage';

interface Props {
  user: ProfileType;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsModal = ({user, visible, setVisible}: Props) => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [name, setName] = React.useState(user.name);
  const [description, setDescription] = React.useState(user.description);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [picURL, setPicURL] = React.useState(user.profilePic);
  const [changes, setChanges] = React.useState<{
    description: string;
    name: string;
    profilePic: any;
    private: boolean;
  }>({description: '', name: '', profilePic: '', private: false});
  const [saved, setSaved] = React.useState(false);

  useEffect(() => {
    setChanges({
      name: name,
      description: description,
      private: isEnabled,
      profilePic: picURL,
    });
    if (saved) {
      updateUser(user.username, changes);
    }
  }, [description, isEnabled, name, saved, user.username]);

  // TODO: Implement a system to save user settings
  const saveSettings = () => {
    if (name !== '') {
      if (selectedImage !== null) {
        const url = uploadProfilePic(selectedImage, user.username);
        setPicURL(url);
        setSaved(true);
      }
    }
  };

  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View style={[Styles.settingsModal]}>
        <View style={Styles.pageHeader}>
          <Text style={[Styles.text, Styles.centerText]}>Settings</Text>
          <CloseButton type={'close'} closeFunction={() => setVisible(false)} />
        </View>
        <ScrollView>
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
          <View style={Styles.settingContainer}>
            <Text style={Styles.paragraphText}>Name</Text>
            <TextInput
              style={[Styles.input, Styles.inputBar]}
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={Styles.settingContainer}>
            <Text style={Styles.paragraphText}>Description</Text>
            <TextInput
              style={[Styles.input, Styles.inputBar]}
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </View>
          <View style={Styles.settingContainerAlt}>
            <Text style={Styles.paragraphText}>Private Profile</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={'white'}
              ios_backgroundColor={'#3e3e3e'}
              onValueChange={() => setIsEnabled(!isEnabled)}
              value={isEnabled}
            />
          </View>
          <Pressable style={Styles.saveButton} onPress={saveSettings}>
            <Text
              style={[Styles.text, Styles.centerText, Styles.paragraphText]}>
              Save
            </Text>
          </Pressable>
          <AppButton
            title={'Log Out'}
            onPress={() => signOut()}
            additionalStyle={{backgroundColor: 'red'}}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};
