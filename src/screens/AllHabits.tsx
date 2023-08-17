import {ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Styles from '../components/Styles';
import {CloseButton} from '../components/Close';
import React, {useContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {HabitDataType} from '../components/types';
import AddHabit from './Modals/AddHabit';
import {addHabitToDB} from '../components/addHabit';
import userContext from '../Contexts/UserContext';

export const AllHabitsScreen = ({navigation}: any) => {
  const [searchText, setSearchText] = React.useState<string>('');
  const [selectedTag, setSelectedTag] = React.useState<string>('Dose');
  const [habits, setHabits] = React.useState<HabitDataType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [habitIds, setHabitIds] = React.useState<string[]>([]);
  const firstRender = React.useRef(true);

  useEffect(() => {
    const fetchHabitData = async (tag: string) => {
      setLoading(true);
      try {
        const habits = await firestore()
          .collection('Habits')
          .where('tags', 'array-contains', tag.toLowerCase())
          .get();
        setHabitIds(habits.docs.map(doc => doc.id));
        setHabits(habits.docs.map(doc => doc.data()) as HabitDataType[]);
      } catch (err) {
        console.error('Error fetching habit data: ', err);
      }
    };
    fetchHabitData(selectedTag);
  }, [selectedTag]);

  useEffect(() => {
    if (!firstRender.current) {
      console.log('Habits: ', habits);
      setLoading(false);
    } else {
      firstRender.current = false;
    }
  }, [habits]);

  const defaultTags = () => {
    const defaultTags = [
      'Dose',
      'Productivity',
      'Health',
      'Social',
      'Emotional',
      'Connection',
      'Energy',
      'Financial',
      'Spiritual',
      'Motor',
    ];
    return (
      <>
        {defaultTags.map((tag, index) => {
          return (
            <Pressable
              key={index}
              style={
                selectedTag !== tag
                  ? innerStyles.tags
                  : [innerStyles.tags, innerStyles.selectedTag]
              }
              onPress={() => setSelectedTag(tag)}>
              <Text
                style={selectedTag === tag ? innerStyles.paragraphText : null}>
                {tag}
              </Text>
            </Pressable>
          );
        })}
      </>
    );
  };

  return (
    <View style={Styles.app}>
      <View style={Styles.header}>
        <Text style={[Styles.text, Styles.notificationHeaderText]}>Search</Text>
        <CloseButton type={'back'} closeFunction={() => navigation.goBack()} />
      </View>
      <View style={Styles.inputBarContainer}>
        <TextInput
          style={[Styles.input, Styles.inputBar]}
          onChangeText={setSearchText}
          placeholderTextColor={'grey'}
          placeholder="Search..."
        />
        <Pressable
          style={Styles.inputBarButton}
          onPress={() => console.log('Search!')}>
          <Image source={require('../icons/search.png')} />
        </Pressable>
      </View>
      <View style={innerStyles.tagContainers}>
        <Text style={[Styles.paragraphText, innerStyles.tagScrollHeader]}>
          Tags
        </Text>
        <View style={innerStyles.tagScroll}>
          <ScrollView horizontal={true}>{defaultTags()}</ScrollView>
        </View>
      </View>
      {loading ? (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={innerStyles.habitContainer}>
            <ActivityIndicator size="large" color="white" />
            <Text style={Styles.text}>Loading...</Text>
          </View>
        </ScrollView>
      ) : (
        <ShowHabits
          habits={habits}
          habitIds={habitIds}
          navigation={navigation}
        />
      )}
    </View>
  );
};

const ShowHabits = (props: {
  habits: HabitDataType[];
  habitIds: string[];
  navigation: any;
}) => {
  const {username, profile, setProfile} = useContext(userContext);
  const userHabitIds = profile?.habits.map(habit => habit.habitId);
  const habitsShown = React.useRef(0);
  const onPress = (habit: HabitDataType) => {
    addHabitToDB(
      habit.name.replace(/\b\w/g, l => l.toUpperCase()),
      habit.desc,
      habit.tags,
      username,
      setProfile,
    );
    props.navigation.navigate('Home');
  };
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      {props.habits.map((habit, index) => {
        if (!userHabitIds?.includes(props.habitIds[index])) {
          habitsShown.current++;
          return (
            <Pressable
              key={index}
              style={innerStyles.habitContainer}
              onPress={() => onPress(habit)}>
              <Text style={Styles.text}>
                {habit.name.replace(/\b\w/g, char => char.toUpperCase())}
              </Text>
              <Text style={innerStyles.paragraphText}>{habit.desc}</Text>
            </Pressable>
          );
        }
      })}
      {habitsShown.current === 0 ? (
        <Text style={Styles.text}>
          No habits to show. Try a different tag!
        </Text>
      ) : null}
      <AddHabit />
    </ScrollView>
  );
};

const innerStyles = StyleSheet.create({
  tagScrollHeader: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tags: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    padding: 7,
    margin: 5,
  },
  selectedTag: {
    backgroundColor: 'grey',
  },
  tagContainers: {
    paddingVertical: 5,
    borderRadius: 5,
    margin: 2,
  },
  tagScroll: {
    flexDirection: 'row',
  },
  paragraphText: {
    fontSize: 16,
    color: '#D9D9D9',
  },
  habitContainer: {
    backgroundColor: '#2A3E59',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 0,
    marginBottom: 10,
  },
});
