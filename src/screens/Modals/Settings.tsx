import React, {useContext, useEffect, useRef} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import Styles from '../../components/Styles';
import {CloseButton} from '../../components/Close';
import {ProfileType} from '../../components/types';
import {AppButton} from '../../components/Button';
import {signOut} from '../../components/auth/signOut';
import {uploadProfilePic} from '../../components/photo/changeProfilePic';
import {updateUser} from '../../components/updateUser';
import {selectImage} from '../../components/photo/selectImage';
import UserContext from '../../Contexts/UserContext';

interface Props {
  user: ProfileType;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsModal = ({user, visible, setVisible}: Props) => {
  const {setProfile} = useContext(UserContext);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [name, setName] = React.useState(user.name);
  const [description, setDescription] = React.useState(user.description);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [changes, setChanges] = React.useState<{
    description: string;
    name: string;
    profilePic: any;
    private: boolean;
  }>({description: '', name: '', profilePic: '', private: false});
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    const changeProfileAndUpdate = async () => {
      setProfile(await updateUser(user.username, changes));
    };
    if (!firstRender.current) {
      changeProfileAndUpdate();
    }
    firstRender.current = false;
  }, [changes]);
  // TODO: Implement a system to save user settings
  const saveSettings = async () => {
    if (name !== '') {
      if (selectedImage !== null) {
        const url = await uploadProfilePic(selectedImage, user.username);
        setChanges({
          description: description,
          name: name,
          profilePic: url,
          private: isEnabled,
        });
      }
    } else {
      throw new Error('Name cannot be empty');
    }
    setVisible(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
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
              {!imageLoaded ? (
                <View style={Styles.profileStatsImage}>
                  <ActivityIndicator size="large" color="grey" />
                </View>
              ) : null}
              {selectedImage === null ? (
                <Image
                  source={{uri: user.profilePic}}
                  style={Styles.profileStatsImage}
                  onLoad={handleImageLoad}
                />
              ) : (
                <Image
                  source={{uri: selectedImage}}
                  style={Styles.profileStatsImage}
                  onLoad={handleImageLoad}
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
