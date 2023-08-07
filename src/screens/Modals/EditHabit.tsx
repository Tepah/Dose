import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Styles from '../../components/Styles';
import {HabitType} from '../../components/types';
import {mockFriends} from '../../test/mockFriends';
import {CloseButton} from '../../components/Close';

interface Props {
  editHabit: (habit: HabitType, index: number) => void;
  visible: boolean;
  habits: HabitType[] | undefined;
  currentHabitIndex: number;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedList: string;
}

const EditHabitScreen = ({
  editHabit,
  visible,
  habits,
  currentHabitIndex,
  setVisible,
}: Props) => {
  const [habitName, setHabitName] = useState(habits[currentHabitIndex].name);
  const [habitDesc, setHabitDesc] = useState(
    habits[currentHabitIndex].description,
  );
  const [habitStreak, setHabitStreak] = useState(habits[currentHabitIndex].streak);
  const [habitProgress, setHabitProgress] = useState(habits[currentHabitIndex].progress);

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
        <TouchableWithoutFeedback onPress={() => openCloseModal()}>
          <View style={Styles.inputFieldBackground}></View>
        </TouchableWithoutFeedback>
        <View style={Styles.editModalContainer}>
          {editForm()}
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    if (habits && habits.length >= currentHabitIndex) {
      setHabitName(() => habits[currentHabitIndex].name);
      setHabitDesc(() => habits[currentHabitIndex].description);
      setHabitStreak(() => habits[currentHabitIndex].streak);
    }
  }, [habits, currentHabitIndex, visible]);

  const mapFollowing = mockFriends.map((following, index) => {
    return (
      <View key={index} style={Styles.individualFollowing}>
        <Image style={Styles.friendProfilePic} source={following.profilePic} />
        <Text style={[Styles.text, Styles.userText]}>{following.username}</Text>
      </View>
    );
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newHabit, setNewHabit] = useState<HabitType>({
    name: habitName,
    description: habitDesc,
    streak: habitStreak,
    progress: habitProgress,
    habitId: (habits ? habits[currentHabitIndex].habitId : ''),
  });
  const editForm = () => {
    const onEditButtonPress = () => {
      setNewHabit({
        name: habitName,
        description: habitDesc,
        streak: habitStreak,
        progress: habitProgress,
        habitId: habits[currentHabitIndex].habitId,
      });
      setEditModalVisible(true);
    };

    const onEditDescriptionSave = () => {
      editHabit(newHabit, currentHabitIndex);
      setEditModalVisible(false);
    };

    return (
      <View>
        <View style={Styles.pageHeader}>
          <Text style={Styles.title}>{habitName}</Text>
          <CloseButton type={'close'} closeFunction={() => openCloseModal()} />
        </View>
        <ScrollView
          style={Styles.fullPageScroller}
          keyboardShouldPersistTaps="always">
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
                animationType={'slide'}
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}>
                <TouchableWithoutFeedback
                  onPress={() => setEditModalVisible(false)}>
                  <View style={Styles.inputFieldBackground}></View>
                </TouchableWithoutFeedback>
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  style={Styles.editDescriptionModal}>
                  <View style={Styles.pageHeader}>
                    <Text style={[Styles.text, {textAlign: 'center'}]}>
                      Edit Description
                    </Text>
                    <CloseButton
                      type={'close'}
                      closeFunction={() => setEditModalVisible(false)}
                    />
                  </View>
                  <TextInput
                    autoFocus={true}
                    multiline
                    maxLength={120}
                    value={newHabit.description}
                    onChangeText={text =>
                      setNewHabit({...newHabit, description: text})
                    }
                    style={Styles.input}
                  />
                  <Pressable
                    style={Styles.submitButton}
                    onPress={() => onEditDescriptionSave()}>
                    <Text style={[Styles.text, {textAlign: 'center'}]}>
                      Submit
                    </Text>
                  </Pressable>
                </KeyboardAvoidingView>
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
