import React, {useEffect, useState} from 'react';
import {Image, Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import Styles from '../components/Styles';
import {profile} from '../components/types';
import {mockProfileList} from '../test/mockProfile1';

const SearchScreen = ({navigation}: any) => {
  const [profiles, setProfiles] = useState<{[key: string]: profile}>(
    mockProfileList,
  );
  const [searchResults, setSearchResults] = useState<profile[]>(
    Object.values(profiles),
  );
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (searchText === '') {
      setSearchResults(Object.values(profiles));
    } else {
      const filteredList = Object.values(profiles).filter(
        (user: profile) =>
          user.username.toLowerCase().includes(searchText.toLowerCase()) ||
          user.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setSearchResults(filteredList);
    }
  }, [searchText]);

  return (
    <View style={Styles.app}>
      <SearchHeader />
      <SearchBar setSearchText={setSearchText} />
      <SearchResults profiles={searchResults} navigation={navigation} />
    </View>
  );
};

const SearchHeader = () => {
  return (
    <View style={Styles.header}>
      <Text style={[Styles.text, Styles.notificationHeaderText]}>Search</Text>
    </View>
  );
};

interface SearchBarProps {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBar = ({setSearchText}: SearchBarProps) => {
  return (
    <View style={Styles.searchBar}>
      <TextInput
        style={[Styles.input, Styles.searchInput]}
        onChangeText={setSearchText}
        placeholderTextColor={'grey'}
        placeholder="Search..."
      />
    </View>
  );
};

interface SearchResultsProps {
  profiles: profile[];
  navigation: any;
}

const SearchResults = ({profiles, navigation}: SearchResultsProps) => {
  const renderProfiles = profiles.map((user: profile, index: number) => (
    <Pressable
      key={index}
      style={Styles.searchResultContainer}
      onPress={() => navigation.navigate('Profile', {user: user})}>
      <Image
        style={Styles.resultImage}
        source={require('../test/water.jpeg')}
      />
      <View style={Styles.searchResultText}>
        <Text style={[Styles.paragraphText]}>{user.username}</Text>
        <Text style={[Styles.paragraphText]}>{user.name}</Text>
      </View>
    </Pressable>
  ));

  return (
    <ScrollView style={Styles.searchResults}>
      {renderProfiles}
    </ScrollView>
  );
};
export default SearchScreen;
