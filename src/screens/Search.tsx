import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TextInput, View} from 'react-native';
import Styles from '../components/Styles';

type Profile = {
  user: string;
  name: string;
};
const SearchScreen = () => {
  const [profiles, setProfiles] = useState<Profile[]>([
    {user: '@tom', name: 'Tom Smith'},
    {user: '@kim', name: 'Kim Quang'},
    {user: '@someoneelse64', name: 'Someone Else'},
  ]);
  const [searchResults, setSearchResults] = useState<Profile[]>(profiles);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (searchText === '') {
      setSearchResults(profiles);
    } else {
      const filteredList = profiles.filter(
        (profile: Profile) =>
          profile.user.toLowerCase().includes(searchText.toLowerCase()) ||
          profile.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setSearchResults(filteredList);
    }
  }, [searchText]);

  return (
    <View style={Styles.app}>
      <SearchHeader />
      <SearchBar setSearchText={setSearchText} />
      <SearchResults profiles={searchResults} />
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
  profiles: Profile[];
}

const SearchResults = ({profiles}: SearchResultsProps) => {
  const renderProfiles = profiles.map((profile: Profile, index: number) => (
    <View key={index} style={Styles.searchResultContainer}>
      <Image
        style={Styles.resultImage}
        source={require('../test/water.jpeg')}
      />
      <View style={Styles.searchResultText}>
        <Text style={[Styles.paragraphText]}>{profile.user}</Text>
        <Text style={[Styles.paragraphText]}>{profile.name}</Text>
      </View>
    </View>
  ));

  return (
    <ScrollView style={Styles.searchResults}>
      {renderProfiles}
    </ScrollView>
  );
};
export default SearchScreen;
