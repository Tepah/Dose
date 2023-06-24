import React, { useEffect, useRef, useState } from "react";
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

const AddHabitScreen = () => {
  const [addScreenVisible, setAddScreenVisible] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [isWeekly, setIsWeekly] = useState(true);
  const renders = useRef(1);

  useEffect(() => {
    renders.current = renders.current + 1;
  });

  const openCloseModal = () => {
    setAddScreenVisible(() => !addScreenVisible);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Name:', habitName);
    console.log('is weekly', isWeekly);
  };

  return (
    <View>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={addScreenVisible}
        onRequestClose={openCloseModal}>
        <View style={Styles.addModal}>
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
          <View style={Styles.addHabitForm}>
            <Text style={[Styles.text, {alignSelf: 'center'}]}>Add Habit</Text>
            <Text style={[Styles.text, {fontSize: 20}]}>Name</Text>
            <TextInput
              style={Styles.input}
              placeholder={'Habit Name'}
              autoFocus={true}
              value={habitName}
              onChangeText={setHabitName}
            />
            <Text style={[Styles.text, {fontSize: 20}]}>Daily</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isWeekly ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setIsWeekly(current => {
                  return !current;
                })
              }
              value={isWeekly}
            />
            <View style={Styles.buttonContainer}>
              <Pressable
                onPress={handleSubmit}
                style={Styles.submitButton}>
                <Text style={[Styles.text, {textAlign: 'center'}]}>
                  Submit
                </Text>
              </Pressable>
            </View>
            <Text>I rendered {renders.current} times</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddHabitScreen;
