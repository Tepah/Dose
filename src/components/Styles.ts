import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D2B3E',
  },
  text: {
    fontFamily: 'Helvetica',
    color: '#D9D9D9',
  },
  navigator: {
    backgroundColor: '#344966',
    position: 'absolute',
    borderRadius: 15,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 5,
    margin: 10,
    borderTopWidth: 0,
  },
  button: {
    minHeight: 10,
    minWidth: 10,
    padding: 10,
  },
  icons: {
    maxHeight: 28,
    maxWidth: 28,
  },
});

export default styles;
