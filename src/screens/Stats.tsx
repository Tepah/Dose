import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const StatsScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>Stats Page</Text>
      <View style={styles.container}>
        <Button
          title="Home"
        onPress={() => navigation.navigate('Home')}
        />
        <Button title="Social" onPress={() => navigation.navigate('Social')} />
        <Button title="Stats" onPress={() => navigation.navigate('Stats')} />
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    margin: 10,
    minWidth: 120,
  },
});

export default StatsScreen;
