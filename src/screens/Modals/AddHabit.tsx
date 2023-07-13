import React, {useEffect, useState} from 'react';
import {Image, Modal, Pressable, Text, TextInput, View} from 'react-native';
import Styles from '../../components/Styles';
import {HabitType} from '../../components/types';

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
        <View style={Styles.addModal}>
          {closeModal()}
          {addForm()}
        </View>
      </Modal>
    );
  };
  const closeModal = () => {
    return (
      <View
        style={{
          alignSelf: 'flex-end',
          top: 20,
          right: 15,
        }}>
        <Pressable onPress={openCloseModal}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../../icons/close.png')}
          />
        </Pressable>
      </View>
    );
  };
  const addForm = () => {
    return (
      <View style={Styles.addHabitForm}>
        <Text style={[Styles.text, {alignSelf: 'center'}]}>Add Habit</Text>
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
