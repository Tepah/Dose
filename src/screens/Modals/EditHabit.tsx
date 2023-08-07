import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Styles from '../../components/Styles';
import {HabitType} from '../../components/types';
import {mockFriends} from '../../test/mockFriends';
import {CloseButton} from '../../components/Close';
import {AppButton} from '../../components/Button';
import firestore from '@react-native-firebase/firestore';

interface Props {
  username: string;
  editHabit: (habit: HabitType, editType: string) => void;
  visible: boolean;
  habits: HabitType[] | undefined;
  currentHabitIndex: number;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedList: string;
}

const EditHabitScreen = ({
  username,
  editHabit,
  visible,
  habits,
  currentHabitIndex,
  setVisible,
}: Props) => {
  const [habitName, setHabitName] = useState(
    habits ? habits[currentHabitIndex].name : '',
  );
  const [habitDesc, setHabitDesc] = useState(
    habits ? habits[currentHabitIndex].description : '',
  );
  const [habitStreak, setHabitStreak] = useState(
    habits ? habits[currentHabitIndex].streak : 0,
  );
  const habitProgress = habits ? habits[currentHabitIndex].progress : {};

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
        <View style={Styles.editModalContainer}>{editForm()}</View>
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
    habitId: habits ? habits[currentHabitIndex].habitId : '',
  });
  const editForm = () => {
    const onEditButtonPress = () => {
      setNewHabit({
        name: habitName,
        description: habitDesc,
        streak: habitStreak,
        progress: habitProgress,
        habitId: habits ? habits[currentHabitIndex].habitId : '',
      });
      setEditModalVisible(true);
    };

    const onEditDescriptionSave = () => {
      editHabit(newHabit, 'edit');
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
          <DeleteHabitButton
            username={username}
            habit={habits ? habits[currentHabitIndex] : null}
            setEditModalVisible={setEditModalVisible}
            editHabit={editHabit}
          />
        </ScrollView>
      </View>
    );
  };
  return <View>{editModal()}</View>;
};

const deleteHabit = (
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  username: string,
  habit: HabitType | null,
  setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  editHabit: (habit: HabitType, editType: string) => void,
) => {
  // Deletes habit from both User collection and Habit collection if there is no users.
  const deleteOnDatabase = async () => {
    try {
      if (habit) {
        // removes habit from user's habits array
        await firestore()
          .collection('Users')
          .doc(username)
          .update({
            habits: firestore.FieldValue.arrayRemove(habit),
          });
        const habitRef = firestore().collection('Habits').doc(habit.habitId);
        const habitDoc = await habitRef.get();
        if (habitDoc.exists) {
          const habitData = habitDoc.data();
          const deleteUserIndex = habitData?.users.findIndex(
            (user: string) => user === username,
          );
          habitData?.users.splice(deleteUserIndex, 1);
          if (habitData?.users.length === 0) {
            await habitRef.delete();
            console.log('Habit deleted from system because no users left');
          } else {
            await habitRef.update({
              users: habitData?.users,
            });
          }
        }
      }
    } catch (err) {
      console.log('Error deleting habit on system: ' + err);
    }
  };
  deleteOnDatabase();
  editHabit(habit as HabitType, 'delete');
  setModalVisible(false);
  setEditModalVisible(false);
};

const DeleteHabitButton = (props: {
  username: string;
  habit: HabitType | null;
  setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editHabit: (habit: HabitType, editType: string) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <AppButton
        onPress={() => setModalVisible(true)}
        title={'Delete Habit'}
        additionalStyle={{backgroundColor: 'red'}}
      />
      <Modal transparent visible={modalVisible} animationType={'slide'}>
        <View style={innerStyles.optionsContainer}>
          <View style={innerStyles.modalContent}>
            <Text style={Styles.paragraphText}>
              Are you sure you want to delete this habit?
            </Text>
            <AppButton
              onPress={() =>
                deleteHabit(
                  setModalVisible,
                  props.username,
                  props.habit,
                  props.setEditModalVisible,
                  props.editHabit,
                )
              }
              title={'Yes'}
            />
            <AppButton onPress={() => setModalVisible(false)} title={'No'} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const innerStyles = StyleSheet.create({
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(50,50,50,0.5)',
    borderRadius: 20,
  },
  modalContent: {
    alignItems: 'center',
    height: 200,
    width: 300,
    backgroundColor: '#0D1821',
    borderRadius: 20,
    padding: 20,
  },
});

export default EditHabitScreen;
