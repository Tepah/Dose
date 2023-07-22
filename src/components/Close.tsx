import {Image, Pressable} from 'react-native';
import Styles from './Styles';
import React from 'react';

interface Props {
  type: String;
  closeFunction: () => void;
}

export const CloseButton = (props: Props) => {
  return (
    <Pressable style={Styles.closeButton} onPress={props.closeFunction}>
      <Image
        style={{height: 30, width: 30}}
        source={
          props.type !== 'close'
            ? props.type === 'back'
              ? require('../icons/back.png')
              : null
            : require('../icons/close.png')
        }
      />
    </Pressable>
  );
};
