import React, {useState} from 'react';
import {Image, Modal, Pressable, Text, View} from 'react-native';
import Styles from '../../components/Styles';

const AddHabitScreen = () => {
  const [addScreenVisible, setAddScreenVisible] = useState(false);


  const onPressAdd = () => {
    setAddScreenVisible(true);
  };

  const closeModal = () => {
    setAddScreenVisible(false);
  };

  return (
    <View>
      <Pressable onPress={onPressAdd}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={addScreenVisible}
        onRequestClose={closeModal}>
        <View style={Styles.addModal}>
          <View
            style={{
              alignSelf: 'flex-end',
              top: 20,
              right: 15,
            }}>
            <Pressable onPress={closeModal}>
              <Image
                style={{height: 30, width: 30}}
                source={require('../../icons/close.png')}
              />
            </Pressable>
          </View>
          <Text style={Styles.text}>AddHabitScreen</Text>
        </View>
      </Modal>
    </View>
  );
};

export default AddHabitScreen;
