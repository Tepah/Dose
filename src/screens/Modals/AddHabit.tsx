import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Styles from '../../components/Styles';
import {HabitType} from '../../components/types';
import {CloseButton} from '../../components/Close';

interface Props {
  addHabit: (habit: HabitType) => void;
}

const AddHabitScreen = ({addHabit}: Props) => {
  const [addScreenVisible, setAddScreenVisible] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitDesc, setHabitDesc] = useState('');
  const [errorModal, setErrorModal] = useState(false);

  const openCloseModal = () => {
    setAddScreenVisible(() => !addScreenVisible);
    setHabitName('');
  };

  const addHabitHandler = () => {
    if (habitName === '') {
      setErrorModal(true);
      return;
    }
    const date = new Date().toDateString();
    const progress: {[key: string]: boolean} = {};
    progress[date] = false;
    addHabit({
      name: habitName,
      description: habitDesc,
      streak: 0,
      progress: progress,
    });
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
        <View style={Styles.addModal}>
          {addForm()}
        </View>
      </Modal>
    );
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

export default AddHabitScreen;
