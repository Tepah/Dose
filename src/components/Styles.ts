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
    position: 'absolute',
    flex: 1,
    bottom: 0,
    backgroundColor: main,
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  pageHeader: {
    padding: 10,
  },
  habitDescContainer: {
  },
  editModalContainer: {
    position: 'absolute',
    backgroundColor: main,
    bottom: 0,
    height: '90%',
    padding: 10,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  editDescriptionContainer: {
    flex: 1,
    borderRadius: 20,
  },
  editModalStreaks: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 5,
  },
  editModalSocial: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: menu,
  },
  editModalFollowing: {
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  individualFollowing: {
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  editDescriptionModal: {
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 5,
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
    top: '20%',
    marginBottom: 155,
    width: '90%',
    alignContent: 'center',
  },
  habitButton: {flex: 1},
  streakText: {fontSize: 18, color: fontColor},
  doneStreakText: {fontSize: 18, color: tertiary},
  //------------------------------------------------------------------------//
  // Social Page Styles
  headerNav: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  headerText: {
    flex: 1,
    paddingLeft: 10,
  },
  navButtons: {
    height: 40,
    width: '25%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  socialView: {
    width: '100%',
  },
  challengePostContainer: {
    width: '100%',
    height: 340,
    paddingTop: 25,
    paddingBottom: 50,
  },
  challengePost: {
    width: '90%',
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
    height: 530,
    paddingTop: 25,
    paddingBottom: 50,
  },
  imagePost: {
    alignSelf: 'center',
    aspectRatio: 1,
    height: 350,
    borderRadius: 20,
  },
  postDetailMiniContainer: {
    margin: 5,
    marginTop: -15,
    paddingVertical: 10,
    borderRadius: 20,
    opacity: 0.95,
  },
  reactBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    height: 60,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  commentButton: {
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  commentButtonImage: {
    width: 25,
    height: 25,
  },
  likeButton: {
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  likeButtonImage: {
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
  commentsContainer: {
    paddingHorizontal: 15,
  },
  userComment: {
    flexDirection: 'row',
  },
  commentFieldContainer: {
    justifyContent: 'flex-end',
    opacity: 0.95,
    width: '100%',
  },
  //------------------------------------------------------------------------//
  // Stats Page Styles
  statsContainer: {flexGrow: 1, width: '100%'},
  statsCardContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: secondary,
  },
  statProfileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  profileStatsText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileStatsImage: {
    flex: 1,
    padding: 20,
    marginVertical: 10,
    height: 120,
    width: 120,
    aspectRatio: 1,
    borderRadius: 60,
  },
  statsProfileTextContainer: {
    flex: 2,
    padding: 20,
    justifyContent: 'center',
  },
  statStartDateText: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
  indHabitContainer: {
    marginTop: 5,
    marginHorizontal: 5,
    aspectRatio: 1,
    borderRadius: 10,
    height: 80,
    padding: 10,
    backgroundColor: menu,
    justifyContent: 'center',
  },
  habitNameText: {
    fontSize: 18,
    textAlign: 'center',
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
    fontSize: 18,
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 28,
    color: fontColor,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  //------------------------------------------------------------------------//
  // Navigator Styles
  navigator: {
    backgroundColor: menu,
    height: '9%',
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
    backgroundColor: menu,
    padding: 10,
    borderRadius: 15,
    alignContent: 'center',
  },
  icons: {
    maxHeight: 30,
    maxWidth: 30,
    padding: 15,
  },
  iconFocused: {
    backgroundColor: secondary,
    padding: 5,
    borderRadius: 20,
  },
  //------------------------------------------------------------------------//
  // Calendar Styles
  calendarContainer: {
    position: 'absolute',
    paddingTop: 60,
    paddingBottom: 5,
    backgroundColor: menu,
    height: '20%',
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  test: {
    backgroundColor: 'black',
  },
  input: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    color: fontColor,
    backgroundColor: secondary,
    marginVertical: 10,
    padding: 5,
    borderRadius: 5,
  },
  datePickerContainer: {
    height: '45%',
    paddingTop: 75,
    backgroundColor: menu,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  yearPicker: {
    flex: 1,
    alignSelf: 'center',
  },
  yearContainer: {
    paddingHorizontal: 10,
  },
  monthPicker: {
    flex: 5,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  monthContainer: {
    width: '33%',
    height: '25%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  //------------------------------------------------------------------------//
  // Notification Styles
  notificationContainer: {
    flex: 1,
    backgroundColor: tertiary,
    width: '100%',
    height: 100,
    padding: 10,
    borderRadius: 8,
    marginVertical: 2,
  },
  notificationScroll: {
    flex: 1,
    width: '100%',
  },
  notificationText: {
    fontSize: 20,
  },
  notificationHeaderText: {
    textAlign: 'center',
  },
  notificationTextContainer: {
    flex: 1,
    width: '60%',
  },
  //------------------------------------------------------------------------//
  // Search Styles
  searchBar: {
    backgroundColor: menu,
    width: '100%',
  },
  searchResults: {
    flex: 1,
    width: '100%',
  },
  resultImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  searchResultContainer: {
    flexDirection: 'row',
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  searchResultText: {
    paddingHorizontal: 10,
  },
  //------------------------------------------------------------------------//
  // Profile Styles
  profileContainer: {
    flexGrow: 1,
    backgroundColor: main,
    width: '100%',
  },
  profileSpacing: {
    width: '100%',
    padding: 10,
    height: '6%',
    marginTop: 50,
    backgroundColor: main,
  },
  profileOptionsContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingHorizontal: 10,
  },
  profileOptionsButton: {
    aspectRatio: 1,
    height: 25,
  },
  profileOptionsImages: {
    aspectRatio: 1,
    height: 25,
  },
  profileHeader: {
    flex: 3,
    backgroundColor: main,
    width: '100%',
    paddingVertical: 20,
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
    textAlign: 'center',
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
  profileButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  profileButton: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 10,
    backgroundColor: menu,
    borderRadius: 5,
  },
  profileDescriptionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    backgroundColor: tertiary,
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
    width: '33%',
    margin: '.1%',
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
  settingsModal: {
    backgroundColor: main,
    width: '100%',
    height: '90%',
    position: 'absolute',
    borderRadius: 10,
    bottom: 0,
    borderWidth: 1,
    borderColor: secondary,
  },
  settingContainerTall: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  settingContainer: {
    height: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  settingContainerAlt: {
    height: 70,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  //------------------------------------------------------------------------//
  // Reusable Styles
  header: {
    backgroundColor: menu,
    padding: 10,
    height: '14%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  fullPageScroller: {
    height: '100%',
  },
  friendProfilePic: {
    height: 70,
    aspectRatio: 1,
    borderRadius: 50,
    alignSelf: 'center',
  },
  editButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  editButtonImage: {
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  commentSmallBold: {
    fontWeight: 'bold',
    fontSize: 16,
    color: fontColor,
  },
  commentText: {
    fontSize: 16,
    color: fontColor,
  },
  inputBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBar: {
    flex: 1,
    color: 'black',
    fontSize: 20,
    padding: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  inputBarButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  inputFieldBackground: {
    flex: 1,
    opacity: 0.8,
    backgroundColor: main,
  },
  centerText: {textAlign: 'center'},
  saveButton: {
    backgroundColor: menu,
    padding: 10,
    borderRadius: 15,
    width: 100,
    alignSelf: 'center',
  },
});

export default styles;
