import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import Styles from '../../components/Styles';

interface Props {
  addHabit: (name: string, weekly: boolean) => void;
}

const AddHabitScreen = ({addHabit}: Props) => {
  const [addScreenVisible, setAddScreenVisible] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [isWeekly, setIsWeekly] = useState(true);

  const openCloseModal = () => {
    setAddScreenVisible(() => !addScreenVisible);
    setHabitName('');
    setIsWeekly(true);
  };

  const addHabitHandler = () => {
    addHabit(habitName, isWeekly);
    setHabitName('');
    setIsWeekly(true);
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
        <Text style={[Styles.text, {fontSize: 20}]}>Name</Text>
        <TextInput
          value={habitName}
          style={Styles.input}
          placeholder={'Habit Name'}
          autoFocus={true}
          onChangeText={setHabitName}
        />
        <Text style={[Styles.text, {fontSize: 20}]}>Daily</Text>
        <Switch
          value={isWeekly}
          onChange={() => setIsWeekly(previousState => !previousState)}
          trackColor={{true: '#7e7e7e'}}
          thumbColor={isWeekly ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
        <View style={Styles.buttonContainer}>
          <Pressable onPress={addHabitHandler} style={Styles.submitButton}>
            <Text style={[Styles.text, {textAlign: 'center'}]}>Submit</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const showModalButton = () => {
    return (
      <View>
        <Pressable onPress={openCloseModal}>
          <Image
            source={require('../../icons/add.png')}
            style={{
              width: 50,
              height: 50,
              alignSelf: 'center',
              marginVertical: 10,
            }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      {showModalButton()}
      {addModal()}
    </View>
  );
};

export default AddHabitScreen;
