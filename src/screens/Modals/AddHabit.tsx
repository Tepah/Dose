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
        transparent={false}
        visible={addScreenVisible}
        onRequestClose={closeModal}>
        <View style={Styles.addModal}>
          <View style={{alignItems: 'flex-end', top: 40}}>
            <Pressable onPress={closeModal}>
              <Image source={require('../../icons/close.png')} />
            </Pressable>
          </View>
          <Text style={Styles.text}>AddHabitScreen</Text>
        </View>
      </Modal>
    </View>
  );
};

export default AddHabitScreen;
