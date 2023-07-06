import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import Styles from '../../components/Styles';
import AddHabitScreen from './AddHabit';

type HabitType = {
  name: string;
  description: string;
  streak: number;
};
interface Props {
  editHabit: (habit: HabitType, index: number) => void;
  visible: boolean;
  habit: HabitType;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditHabitScreen = ({editHabit, visible, habit, setVisible}: Props) => {
  const [habitName, setHabitName] = useState(habit.name);
  const [habitDesc, setHabitDesc] = useState(habit.description);

  const openCloseModal = () => {
    setVisible(() => !visible);
  };

  const editModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={openCloseModal}>
        <View style={Styles.editModalContainer}>
          {closeModal()}
          {editForm()}
        </View>
      </Modal>
    );
  };
  const closeModal = () => {
    return (
      <Pressable
        style={{
          alignSelf: 'flex-end',
          top: 20,
          right: 15,
        }}
        onPress={openCloseModal}>
        <Image
          style={{height: 30, width: 30}}
          source={require('../../icons/close.png')}
        />
      </Pressable>
    );
  };
  const editForm = () => {
    return (
      <View style={Styles.addHabitForm}>
        <Text style={[Styles.text, {alignSelf: 'center', fontWeight: 'bold'}]}>
          {habitName}
        </Text>
        <Text style={[Styles.text]}>Description: </Text>
        <Text style={[Styles.paragraphText]}>{habitDesc}</Text>
      </View>
    );
  };
  return (
    <View>
      {editModal()}
    </View>
  );
};

export default EditHabitScreen;
