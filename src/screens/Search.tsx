import React, {useContext, useEffect, useState} from 'react';
import {Image, Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import Styles from '../components/Styles';
import {ProfileType} from '../components/types';
import {CloseButton} from '../components/Close';
import {findUsers} from '../components/firestore/getUser';
import userContext from '../Contexts/UserContext';

const SearchScreen = ({navigation}: any) => {
  const [profiles, setProfiles] = useState<ProfileType[] | undefined>(
    undefined,
  );
  const [searchResults, setSearchResults] = useState<ProfileType[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  // useEffect(() => {
  //   if (searchText === '') {
  //     setSearchResults(Object.values(profiles));
  //   } else {
  //     const filteredList = Object.values(profiles).filter(
  //       (user: ProfileType) =>
  //         user.username.toLowerCase().includes(searchText.toLowerCase()) ||
  //         user.name.toLowerCase().includes(searchText.toLowerCase()),
  //     );
  //     setSearchResults(filteredList);
  //   }
  // }, [searchText]);

  useEffect(() => {
    setSearchResults(profiles || []);
  }, [profiles]);


  return (
    <View style={Styles.app}>
      <SearchHeader navigation={navigation} />
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        setProfiles={setProfiles}
      />
      <SearchResults profiles={searchResults} navigation={navigation} />
    </View>
  );
};

const SearchHeader = ({navigation}: any) => {
  return (
    <View style={Styles.header}>
      <Text style={[Styles.text, Styles.notificationHeaderText]}>Search</Text>
      <CloseButton type={'back'} closeFunction={() => navigation.goBack()} />
    </View>
  );
};

interface SearchBarProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setProfiles: React.Dispatch<React.SetStateAction<ProfileType[] | undefined>>;
}
const SearchBar = ({
  searchText,
  setSearchText,
  setProfiles,
}: SearchBarProps) => {
  const [searchResults, setSearchResults] = useState<ProfileType[]>();

  useEffect(() => {
    setProfiles(searchResults);
  }, [searchResults]);

  const onPressSearch = () => {
    findUsers(searchText).then(users => {
      setSearchResults(users);
    });
  };

  return (
    <View style={Styles.inputBarContainer}>
      <TextInput
        value={searchText}
        style={[Styles.input, Styles.inputBar]}
        onChangeText={setSearchText}
        placeholderTextColor={'grey'}
        placeholder="Search..."
      />
      <Pressable style={Styles.inputBarButton} onPress={onPressSearch}>
        <Image source={require('../icons/search.png')} />
      </Pressable>
    </View>
  );
};

interface SearchResultsProps {
  profiles: ProfileType[];
  navigation: any;
}

const SearchResults = ({profiles, navigation}: SearchResultsProps) => {
  const {username} = useContext(userContext);
  const renderProfiles = profiles.map((user: ProfileType, index: number) => {
    if (user.username === username) {
      return null;
    }
    return (
      <Pressable
        key={index}
        style={Styles.searchResultContainer}
        onPress={() => navigation.navigate('Profile', {user: user.username})}>
        <Image style={Styles.resultImage} source={{uri: user.profilePic}} />
        <View style={Styles.searchResultText}>
          <Text style={[Styles.paragraphText]}>{user.username}</Text>
          <Text style={[Styles.paragraphText]}>{user.name}</Text>
        </View>
      </Pressable>
    );
  });

  return (
    <ScrollView style={Styles.searchResults}>
      {renderProfiles}
    </ScrollView>
  );
};
export default SearchScreen;
