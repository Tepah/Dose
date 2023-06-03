import * as React from 'react';
import {useState} from 'react';
import {Button, View, Text} from 'react-native';

const HomeScreen = ({navigation}: Props) => {
  const [name, setName] = useState('hello');

  return (
    <View>
      <Text>{name}</Text>
      <Button title={'Starting'} onPress={() => setName('Bye')} />
    </View>
  );
};

export default HomeScreen;
