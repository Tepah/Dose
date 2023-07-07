import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Pressable, ScrollView,
  Text,
  View
} from 'react-native';
import Styles from '../../components/Styles';
import {HabitType} from '../../components/types';
import {mockFriends} from '../../test/mockFriends';

interface Props {
  editHabit: (habit: HabitType, index: number) => void;
  visible: boolean;
  habits: HabitType[];
  currentHabitIndex: number;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditHabitScreen = ({editHabit, visible, habits, currentHabitIndex, setVisible}: Props) => {
  const [habitName, setHabitName] = useState(habits[currentHabitIndex].name);
  const [habitDesc, setHabitDesc] = useState(
    habits[currentHabitIndex].description,
  );
  const [habitStreak, setHabitStreak] = useState(habits[currentHabitIndex].streak);

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
          {editForm()}
          {closeModal()}
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    setHabitName(() => habits[currentHabitIndex].name);
    setHabitDesc(() => habits[currentHabitIndex].description);
    setHabitStreak(() => habits[currentHabitIndex].streak);
    console.log('habit', habits[currentHabitIndex], 'index', currentHabitIndex);
  }, [habits, currentHabitIndex, visible]);

  const closeModal = () => {
    return (
      // TODO: Change the damn button
      <Pressable
        style={{
          position: 'absolute',
          top: 15,
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
  const mapFollowing = mockFriends.map((following, index) => {
    return (
      <View key={index} style={Styles.individualFollowing}>
        <Image style={Styles.friendProfilePic} source={following.profilePic} />
        <Text style={[Styles.text, Styles.userText]}>{following.username}</Text>
      </View>
    );
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const editForm = () => {
    const onEditButtonPress = () => {
      setEditModalVisible(true)
    };

    return (
      <View>
        <View style={Styles.pageHeader}>
          <Text style={Styles.title}>{habitName}</Text>
        </View>
        <ScrollView style={Styles.fullPageScroller}>
          <View style={Styles.editDescriptionContainer}>
            <View>
              <Text style={[Styles.text]}>Description: </Text>
              <Text style={[Styles.paragraphText]}>{habitDesc}</Text>
              <Pressable
                style={Styles.editButton}
                onPress={() => onEditButtonPress()}>
                <Image
                  style={Styles.editButtonImage}
                  source={require('../../icons/pencil.png')}
                />
              </Pressable>
              <Modal
                animationType={"slide"}
                visible={editModalVisible}>
                <View style={Styles.test}></View>
                <Pressable style={[{flex: 1}]} onPress={() => setEditModalVisible(false)}><Text>Close</Text></Pressable>
              </Modal>
            </View>
          </View>
          <View style={Styles.editModalStreaks}>
            <Text style={[Styles.text]}>Streak: </Text>
            <Text style={[Styles.text]}>{habitStreak}</Text>
          </View>
          <View style={Styles.editModalSocial}>
            <Text style={Styles.text}>People doing this:</Text>
            <View style={Styles.editModalFollowing}>
              {mapFollowing}
              <View style={Styles.individualFollowing}>
                <Image
                  style={Styles.friendProfilePic}
                  source={require('../../icons/add.png')}
                />
              </View>
            </View>
          </View>
        </ScrollView>
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
