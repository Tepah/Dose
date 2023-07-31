import React from 'react';
import {Pressable, Text} from 'react-native';
import Styles from './Styles';

interface Props {
  onPress: (arg0?: any, arg1?: any) => void;
  title: string;
  additionalStyle?: object;
}
export const AppButton = (props: Props) => {
  return (
    <Pressable
      style={[Styles.button, props.additionalStyle]}
      onPress={props.onPress}>
      <Text style={[Styles.centerText, Styles.paragraphText]}>{props.title}</Text>
    </Pressable>
  );
};
