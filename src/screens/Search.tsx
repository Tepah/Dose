import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Styles from "../components/Styles";

const SearchScreen = () => {
  const [profiles, setProfiles] = useState<string[]>([
    'Name 1',
    'Name 2',
    'Name 3',
  ]);

  return (
    <View style={Styles.app}>
      {profiles.map(names => (
        <Text style={Styles.text}>{names}</Text>
      ))}
    </View>
  );
};

export default SearchScreen;
