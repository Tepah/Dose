import Styles from '../components/Styles';
import {ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {CloseButton} from '../components/Close';
import React, {useContext, useEffect, useRef} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HabitDataType, RootStackParamList} from '../components/types';
import {getHabitSearch} from '../components/firestore/getHabits';
import UserContext from '../Contexts/UserContext';
import {addHabitToDB} from '../components/addHabit';

type Props = NativeStackScreenProps<RootStackParamList, 'Habits'>;

export const SearchHabitsScreen = ({route, navigation}: any) => {
  const {search} = route.params;
  const {username, profile, setProfile} = useContext(UserContext);
  const [searchText, setSearchText] = React.useState<string>(search);
  const [page, setPage] = React.useState<number>(1);
  const [habitIds, setHabitIds] = React.useState<string[]>([]);
  const [habits, setHabits] = React.useState<HabitDataType[] | undefined>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const userHabitIds = profile?.habits.map(habit => habit.habitId);
  const habitsShown = useRef<number>(0);

  useEffect(() => {
    if (habits) {
      setLoading(false);
    }
  }, [habits]);

  useEffect(() => {
    setLoading(true);
    getHabitSearch(searchText, page, setHabitIds).then(res => {
      setHabits(res);
    });
    setPage(1);
  }, [searchText]);

  const onPress = (habit: HabitDataType) => {
    addHabitToDB(
      habit.name.replace(/\b\w/g, l => l.toUpperCase()),
      habit.desc,
      habit.tags,
      username,
      setProfile,
    );
    navigation.navigate('Home');
  };

  const renderHabits = () => {
    return (
      <ScrollView style={innerStyles.habitScrollView}>
        {habits?.map((habit, index) => {
          if (!userHabitIds?.includes(habitIds[index])) {
            habitsShown.current++;
            return (
              <Pressable
                key={index}
                style={innerStyles.habitContainer}
                onPress={() => onPress(habit)}>
                <Text style={[Styles.text, innerStyles.habitName]}>
                  {habit.name.replace(/\b\w/g, l => l.toUpperCase())}
                </Text>
                <Text style={[Styles.paragraphText, innerStyles.habitDesc]}>{habit.desc}</Text>
              </Pressable>
            );
          }
        })}
        {habitsShown.current === 0 ? (
          <Text style={Styles.paragraphText}>No results...</Text>
        ) : null}
      </ScrollView>
    );
  };

  return (
    <View style={Styles.app}>
      <View style={Styles.header}>
        <Text style={[Styles.text, Styles.notificationHeaderText]}>{search}</Text>
        <CloseButton type={'back'} closeFunction={() => navigation.goBack()} />
      </View>
      <View style={Styles.inputBarContainer}>
        <TextInput
          style={[Styles.input, Styles.inputBar]}
          onChangeText={setSearchText}
          value={searchText}
          placeholderTextColor={'grey'}
          placeholder="Search..."
        />
        <Pressable
          style={Styles.inputBarButton}
          onPress={() => console.log('Search!')}>
          <Image source={require('../icons/search.png')} />
        </Pressable>
      </View>
      {loading ? (
        <ScrollView>
          <View style={innerStyles.habitContainer}>
            <ActivityIndicator size="large" color="white" />
            <Text style={Styles.text}>Loading...</Text>
          </View>
        </ScrollView>
      ) : (
        renderHabits()
      )}
    </View>
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
    alignSelf: 'center',
    backgroundColor: '#2A3E59',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 0,
    marginBottom: 10,
    width: '95%',
  },
  habitName: {

  },
  habitDesc: {

  },
  habitScrollView: {
    width: '100%',
    alignContent: 'center',
  },
});
