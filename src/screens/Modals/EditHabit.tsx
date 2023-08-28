import React, {useContext, useEffect, useState} from 'react';
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
import {HabitType, ProfileType} from '../../components/types';
import {CloseButton} from '../../components/Close';
import {AppButton} from '../../components/Button';
import firestore from '@react-native-firebase/firestore';
import UserContext from '../../Contexts/UserContext';

interface Props {
  username: string;
  editHabit: (habit: HabitType, editType: string) => void;
  visible: boolean;
  habits: HabitType[] | undefined;
  currentHabitIndex: number;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedList: string;
  navigation: any;
}

const EditHabitScreen = ({
  username,
  editHabit,
  visible,
  habits,
  currentHabitIndex,
  setVisible,
  navigation,
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

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newHabit, setNewHabit] = useState<HabitType>({
    name: habitName,
    description: habitDesc,
    streak: habitStreak,
    progress: habitProgress,
    habitId: habits ? habits[currentHabitIndex].habitId : '',
    habitTags: habits ? habits[currentHabitIndex].habitTags : [],
    private: habits ? habits[currentHabitIndex].private : false,
  });
  const editForm = () => {
    const onEditButtonPress = () => {
      setNewHabit({
        name: habitName,
        description: habitDesc,
        streak: habitStreak,
        progress: habitProgress,
        habitId: habits ? habits[currentHabitIndex].habitId : '',
        habitTags: habits ? habits[currentHabitIndex].habitTags : [],
        private: habits ? habits[currentHabitIndex].private : false,
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
          <HabitFollowingList navigation={navigation} habitName={habitName} openCloseModal={openCloseModal} />
          <DeleteHabitButton
            username={username}
            habit={habits ? habits[currentHabitIndex] : null}
            setVisible={setVisible}
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
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  editHabit: (habit: HabitType, editType: string) => void,
  setProfile: React.Dispatch<React.SetStateAction<ProfileType | undefined>>,
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
        const userRef = await firestore().collection('Users').doc(username);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          setProfile(userDoc.data() as ProfileType);
        }
      }
    } catch (err) {
      console.log('Error deleting habit on system: ' + err);
    }
  };
  deleteOnDatabase();
  editHabit(habit as HabitType, 'delete');
  setModalVisible(false);
  setVisible(false);
};

const DeleteHabitButton = (props: {
  username: string;
  habit: HabitType | null;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editHabit: (habit: HabitType, editType: string) => void;
}) => {
  const {setProfile} = useContext(UserContext);
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
                  props.setVisible,
                  props.editHabit,
                  setProfile,
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

const HabitFollowingList = ({
  habitName,
  navigation,
  openCloseModal,
}: {
  habitName: string;
  navigation: any;
  openCloseModal: () => void;
}) => {
  const {profile} = useContext(UserContext);
  const [following, setFollowing] = useState<string[]>(profile?.following);
  const [followingPics, setFollowingPics] = useState<string[]>([]);

  useEffect(() => {
    const getFollowingWithHabit = async () => {
      // TODO: possible inefficiency here, can be optimized
      try {
        let temp: string[] = [];
        let tempPics: string[] = [];
        for (const user of profile?.following) {
          const userRef = await firestore().collection('Users').doc(user);
          const userDoc = await userRef.get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            const userHabits = userData?.habits;
            const habitIndex = userHabits?.findIndex(
              (habit: HabitType) => habit.name === habitName,
            );
            if (habitIndex !== -1) {
              temp.push(userData?.username);
              tempPics.push(userData?.profilePic);
            }
          }
        }
        setFollowing(temp);
        setFollowingPics(tempPics);
        console.log('Following with habit: ' + following);
      } catch (err) {
        console.log('Error getting following with habit: ' + err);
      }
    };
    getFollowingWithHabit();
  }, [habitName]);

  const mapFollowing = following?.map((following, index) => {
    const onPress = () => {
      openCloseModal();
      navigation.navigate('Profile', {user: following});
    };
    return (
      <Pressable key={index} onPress={onPress}>
        <View style={Styles.individualFollowing}>
          <Image
            style={Styles.friendProfilePic}
            source={{uri: followingPics[index]}}
          />
          <Text style={[Styles.text, Styles.userText]}>{following}</Text>
        </View>
      </Pressable>
    );
  });

  return (
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
