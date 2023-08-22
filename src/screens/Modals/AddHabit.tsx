import React, {ReactNode, useContext, useEffect, useRef, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet, Switch
} from 'react-native';
import Styles from '../../components/Styles';
import {CloseButton} from '../../components/Close';
import UserContext from '../../Contexts/UserContext';
import {addHabitToDB} from '../../components/addHabit';
import {HabitDataType, HabitType} from '../../components/types';
import {AppButton} from '../../components/Button';

const AddHabitScreen = () => {
  const {username: user, setProfile} = useContext(UserContext);
  const [addScreenVisible, setAddScreenVisible] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitDesc, setHabitDesc] = useState('');
  const [tag, setTag] = useState('');
  const [habitTags, setHabitTags] = useState<string[]>([]);
  const [errorModal, setErrorModal] = useState(false);

  const openCloseModal = () => {
    setAddScreenVisible(() => !addScreenVisible);
    setHabitName('');
    setHabitDesc('');
  };

  const addHabitHandler = () => {
    if (habitName === '') {
      setErrorModal(true);
      return;
    }
    addHabitToDB(habitName, habitDesc, habitTags, user, setProfile);
    setHabitName('');
    openCloseModal();
  };

  const addModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={addScreenVisible}
        onRequestClose={openCloseModal}>
        <TouchableWithoutFeedback onPress={() => openCloseModal()}>
          <View style={Styles.inputFieldBackground}></View>
        </TouchableWithoutFeedback>
        <View style={Styles.addModal}>{addForm()}</View>
      </Modal>
    );
  };

  const removeTagOnPress = (tagToRemove: string) => {
    setHabitTags(prev => {
      return prev.filter(item => item !== tagToRemove);
    });
  };

  const renderTags = habitTags.map((currentTag, index) => {
    return (
      <Pressable key={index} onPress={() => removeTagOnPress(currentTag)}>
        <View style={Styles.tagContainer}>
          <Text style={[Styles.paragraphText]}>{currentTag}</Text>
          <Image source={require('../../icons/close.png')} />
        </View>
      </Pressable>
    );
  });

  const addTagOnPress = () => {
    if (
      tag === '' ||
      habitTags.includes(tag) ||
      habitTags.length > 4 ||
      tag.length > 10 ||
      tag.length < 3 ||
      tag === 'dose'
    ) {
      setErrorModal(true);
      return;
    }
    setHabitTags(prev => {
      setTag('');
      return [...prev, tag];
    });
  };

  const addForm = () => {
    return (
      <View style={Styles.addHabitForm}>
        <View style={Styles.pageHeader}>
          <Text style={[Styles.text, {alignSelf: 'center'}]}>Add Habit</Text>
          <CloseButton type={'close'} closeFunction={() => openCloseModal()} />
        </View>
        <Text style={Styles.paragraphText}>Name</Text>
        <TextInput
          value={habitName}
          style={Styles.input}
          placeholder={'Habit Name'}
          placeholderTextColor={'grey'}
          autoFocus={true}
          onChangeText={setHabitName}
          maxLength={20}
        />
        <Text style={[Styles.paragraphText]}>Description (optional)</Text>
        <TextInput
          multiline
          maxLength={120}
          value={habitDesc}
          style={Styles.input}
          onChangeText={setHabitDesc}
        />
        <Text style={[Styles.paragraphText]}>Tags</Text>
        <View style={Styles.inputBarContainer}>
          <TextInput
            multiline
            maxLength={30}
            value={tag}
            style={[Styles.input, innerStyles.inputBar]}
            onChangeText={setTag}
          />
          <Pressable
            style={[Styles.inputBarButton, Styles.addTagButton]}
            onPress={() => addTagOnPress()}>
            <Image source={require('../../icons/plus.png')} />
          </Pressable>
        </View>
        <View style={Styles.allTagsContainer}>{renderTags}</View>
        <View style={Styles.buttonContainer}>
          <Pressable onPress={addHabitHandler} style={Styles.submitButton}>
            <Text style={[Styles.text, {textAlign: 'center'}]}>Submit</Text>
          </Pressable>
        </View>
        <Modal visible={errorModal} animationType="fade" transparent={true}>
          <View style={Styles.errorContainer}>
            <Text style={[Styles.text, Styles.errorText]}>
              Habit name cannot be empty.
            </Text>
          </View>
        </Modal>
      </View>
    );
  };

  const showModalButton = () => {
    return (
      <Pressable style={Styles.addButton} onPress={() => openCloseModal()}>
        <Image
          source={require('../../icons/add.png')}
          style={{
            width: 60,
            height: 60,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
      </Pressable>
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorModal(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [errorModal]);
  return (
    <View>
      {addModal()}
      {showModalButton()}
    </View>
  );
};

export const ConfirmAddModal = (props: {
  navigation: any;
  habit: HabitDataType;
  visible: boolean;
  setVisible: (arg0: boolean) => void;
}) => {
  const [privateHabit, setPrivateHabit] = useState(false);
  const openCloseModal = () => {
    props.setVisible(false);
  };
  console.log(props.habit);

  const addForm = () => {
    return (
      <View style={Styles.addHabitForm}>
        <View style={Styles.pageHeader}>
          <Text style={[Styles.text, {alignSelf: 'center'}]}>Add Habit</Text>
          <CloseButton type={'close'} closeFunction={() => openCloseModal()} />
        </View>
        <Text style={Styles.text}>
          {props.habit.name.replace(/\b\w/g, i => i.toUpperCase())}
        </Text>
        <Text style={Styles.paragraphText}>{props.habit.desc}</Text>
        <View style={innerStyles.privateSwitchContainer}>
          <Text style={Styles.text}>Private</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={'white'}
            ios_backgroundColor={'#3e3e3e'}
            onValueChange={() => setPrivateHabit(temp => !temp)}
            value={privateHabit}
          />
        </View>
        <AppButton onPress={() => console.log(props.habit)} title={'Submit'} />
      </View>
    );
  };

  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={() => openCloseModal()}>
        <View style={Styles.inputFieldBackground}></View>
      </TouchableWithoutFeedback>
      <View style={Styles.addModal}>{addForm()}</View>
    </Modal>
  );
};

const innerStyles = StyleSheet.create({
  inputBar: {flex: 10, marginRight: 5},
  privateSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddHabitScreen;
