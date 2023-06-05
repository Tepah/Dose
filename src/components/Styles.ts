import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#1D2B3E',
  },
  text: {
    fontFamily: 'Helvetica',
    color: '#D9D9D9',
  },
  navigator: {
    backgroundColor: '#344966',
    position: 'absolute',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
  },
  button: {
    minHeight: 10,
    minWidth: 10,
    padding: 10,
  },
});

export default styles;
