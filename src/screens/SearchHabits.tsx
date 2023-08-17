import Styles from '../components/Styles';
import {ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {CloseButton} from '../components/Close';
import React, {useEffect} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HabitDataType, RootStackParamList} from '../components/types';
import {getHabitSearch} from '../components/firestore/getHabits';

type Props = NativeStackScreenProps<RootStackParamList, 'Habits'>;

export const SearchHabitsScreen = ({route, navigation}: any) => {
  const {search} = route.params;
  console.log(route.params);
  const [searchText, setSearchText] = React.useState<string>(search);
  const [page, setPage] = React.useState<number>(1);
  const [habits, setHabits] = React.useState<HabitDataType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setHabits(getHabitSearch(searchText, page));
    console.log(habits);
  }, [search]);
  const renderHabits = () => {

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
      <ScrollView>
        {loading ? (
          <View style={innerStyles.habitContainer}>
            <ActivityIndicator size="large" color="white" />
            <Text style={Styles.text}>Loading...</Text>
          </View>
        ) : (
          renderHabits()
        )}
      </ScrollView>
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
    backgroundColor: '#2A3E59',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 0,
    marginBottom: 10,
  },
});
