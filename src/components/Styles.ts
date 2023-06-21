import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D1821',
  },
  // Habit Styles
  habitContainer: {
    flex: 1,
    backgroundColor: '#344966',
    borderRadius: 10,
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
    height: '8%',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 5,
    borderTopWidth: 0,
  },
  button: {
    minHeight: 10,
    minWidth: 10,
    padding: 10,
  },
  icons: {
    maxHeight: 30,
    maxWidth: 30,
  },
  calendarContainer: {
    position: 'absolute',
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#1D2B3E',
    height: 110,
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
