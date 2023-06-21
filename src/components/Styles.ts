import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D2B3E',
  },
  // Habit Styles
  habitContainer: {
    flex: 1,
    backgroundColor: 'darkgray',
    borderRadius: 15,
    height: 40,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  habitList: {
    flex: 1,
    top: 110,
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
    alignContent: 'center',
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 28,
    color: '#D9D9D9',
  },
  // Navigator Styles
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
  calendarContainer: {
    position: 'absolute',
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#344966',
    height: 110,
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
