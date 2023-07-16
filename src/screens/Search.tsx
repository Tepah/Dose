import React, {useState} from 'react';
import { Text, TextInput, View } from "react-native";
import Styles from '../components/Styles';

const SearchScreen = () => {
  const [profiles, setProfiles] = useState<string[]>([
    '@tom',
    '@kim',
    '@someoneelse64',
  ]);
  const [searchText, setSearchText] = useState<string>('');
  return (
    <View style={Styles.app}>
      <SearchHeader />
      <SearchBar />
      <Text style={Styles.text}>
        bobby
      </Text>
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
        placeholder="Search..." />
    </View>
  );
}
export default SearchScreen;
