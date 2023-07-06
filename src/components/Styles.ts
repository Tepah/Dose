import {StyleSheet} from 'react-native';

const main = '#0D1821';
const secondary = '#344966';
const tertiary = '#2A3E59';
const menu = '#1D2B3E';
const fontColor = '#D9D9D9';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: main,
  },
  //------------------------------------------------------------------------//
  // Modal Styles
  // Add Modal Styles
  addModal: {
    flex: 1,
    backgroundColor: menu,
    marginTop: 120,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  addHabitForm: {
    padding: 20,
    height: '50%',
    justifyContent: 'space-between',
  },
  addButton: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },
  // Edit Modal Styles
  editModalContainer: {
    backgroundColor: main,
  },
  //------------------------------------------------------------------------//
  // Home Page Styles
  habitContainer: {
    flex: 1,
    backgroundColor: secondary,
    borderRadius: 10,
    height: 100,
    marginVertical: 5,
    padding: 20,
  },
  habitContainerSwiped: {
    flex: 1,
    backgroundColor: menu,
    borderRadius: 10,
    height: 100,
    marginVertical: 5,
    padding: 20,
  },
  habitList: {
    flexGrow: 1,
    top: 110,
    marginBottom: 160,
    width: '90%',
    alignContent: 'center',
  },
  habitButton: {flex: 1},
  streakText: {fontSize: 18, color: fontColor},
  doneStreakText: {fontSize: 18, color: tertiary},
  //------------------------------------------------------------------------//
  // Social Page Styles
  header: {
    position: 'absolute',
    flex: 1,
    backgroundColor: menu,
    padding: 5,
    paddingTop: 30,
    height: 80,
    top: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerNav: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
  headerText: {
    flex: 1,
    paddingLeft: 10,
  },
  navButtons: {
    padding: 30,
    height: 40,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialView: {
    width: '100%',
    top: 80,
    marginBottom: 130,
  },
  challengePostContainer: {
    width: '100%',
    height: 300,
  },
  challengePost: {
    width: '95%',
    height: 150,
    backgroundColor: secondary,
    borderRadius: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  challengers: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imagePostContainer: {
    width: '100%',
    height: 550,
  },
  imagePost: {
    width: '100%',
    height: 400,
  },
  reactBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    height: 80,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactButtons: {
    alignItems: 'flex-end',
  },
  likeButton: {
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  likeButtonImage: {
    alignSelf: 'center',
    width: 30,
    height: 30,
  },
  postCaptionContainer: {
    paddingHorizontal: 15,
  },
  userPostImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  //------------------------------------------------------------------------//
  // Text Styles
  text: {
    fontFamily: 'Helvetica',
    fontSize: 28,
    color: fontColor,
  },
  paragraphText: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    color: fontColor,
  },
  doneText: {
    fontFamily: 'Helvetica',
    fontSize: 28,
    color: tertiary,
    textDecorationLine: 'line-through',
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  caption: {
    fontSize: 22,
  },
  //------------------------------------------------------------------------//
  // Navigator Styles
  navigator: {
    backgroundColor: menu,
    position: 'absolute',
    height: '8%',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 5,
    borderTopWidth: 0,
  },
  buttonContainer: {
    height: 70,
    width: 180,
    alignSelf: 'center',
    alignContent: 'center',
  },
  button: {
    minHeight: 10,
    minWidth: 10,
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#b4cded',
    padding: 10,
    borderRadius: 15,
    alignContent: 'center',
  },
  icons: {
    maxHeight: 30,
    maxWidth: 30,
  },
  //------------------------------------------------------------------------//
  // Calendar Styles
  calendarContainer: {
    position: 'absolute',
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: menu,
    height: 110,
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    backgroundColor: 'black',
  },
  input: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    color: fontColor,
    backgroundColor: secondary,
    padding: 5,
    borderRadius: 5,
  },
  //------------------------------------------------------------------------//
  // Notification Styles
  notificationContainer: {
    flex: 1,
    backgroundColor: menu,
    width: '100%',
    height: 100,
    padding: 10,
    marginBottom: 1,
    borderRadius: 8,
  },
  notificationScroll: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 55,
  },
  notificationText: {
    fontSize: 20,
  },
  notificationHeaderText: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingTop: 30,
  },
  notificationTextContainer: {
    flex: 1,
    width: '60%',
  },
  //------------------------------------------------------------------------//
  // Profile Styles
  profileContainer: {
    flexGrow: 1,
    backgroundColor: main,
    width: '100%',
    marginBottom: 50,
  },
  profileHeader: {
    flex: 3,
    backgroundColor: menu,
    marginTop: 30,
    width: '100%',
    paddingTop: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profilePicture: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  profileNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileHeaderText: {
    fontSize: 15,
  },
  profileHeaderUser: {
    flex: 2,
    alignItems: 'center',
  },
  followCount: {
    alignSelf: 'center',
  },
  followContainer: {
    flex: 1,
    padding: 5,
  },
  profileDescriptionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profileTabsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  profileTabText: {
    fontSize: 20,
    textAlign: 'center',
  },
  profileTabButton: {
    flex: 1,
    padding: 10,
    borderColor: fontColor,
  },
  profileTabSelected: {
    backgroundColor: menu,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  profileHabitsContainer: {
    flex: 9,
    backgroundColor: menu,
  },
  profileHabit: {
    padding: 15,
    margin: 5,
    borderRadius: 5,
    backgroundColor: secondary,
  },
  proHabitText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  proHabitDescriptionText: {
    fontSize: 20,
  },
  proHabitStreakText: {
    fontSize: 16,
    color: 'grey',
  },
  mediaTabContainer: {
    backgroundColor: menu,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
  },
  postSquare: {
    width: '32%',
    margin: '.6%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  postSquareImage: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
  postSquareChallenge: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: tertiary,
    padding: 10,
  },
  challengeSquareText: {
    fontSize: 50,
  },
  challengeSquareChallenger: {
    alignSelf: 'flex-end',
    fontSize: 28,
  },
  //------------------------------------------------------------------------//
  // Error Styles
  errorContainer: {
    position: 'absolute',
    flex: 1,
    padding: 10,
    paddingVertical: 40,
    top: 20,
    backgroundColor: main,
    borderRadius: 5,
    alignSelf: 'center',
  },
  errorText: {color: 'red', fontSize: 26},
});

export default styles;
