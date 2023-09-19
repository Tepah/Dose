import {Text, TouchableOpacity, View} from 'react-native';
import {AppButton} from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import { Camera } from 'react-native-camera-kit';
import Styles from '../components/Styles';
import React from 'react';

export const PostScreen = ({route}: any) => {
  const {habit} = route.params;
  const navigation = useNavigation();
  const onPress = () => {
    navigation.goBack();
  };

  const handleCapture = async () => {
    try {
      const image = await Camera.capture();
      console.log(image);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={Styles.app}>
      <View style={{ flex: 1 }}>
        <Camera
          ref={(ref) => (this.camera = ref)}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={handleCapture}>
          <Text>Take Picture</Text>
        </TouchableOpacity>
      </View>
      <Text>{habit.name}</Text>
      <AppButton onPress={onPress} title={'back'} />
    </View>
  );
};
