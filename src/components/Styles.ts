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
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
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
    width: '100%',
    marginHorizontal: 20,
    padding: 15,
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
    top: '17%',
    marginBottom: 135,
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
  commentsContainer: {
    paddingHorizontal: 15,
  },
  userComment: {
    flexDirection: 'row',
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
    backgroundColor: menu,
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
    paddingBottom: 5,
    backgroundColor: menu,
    height: '17%',
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
    marginVertical: 10,
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
    borderRadius: 8,
    marginBottom: 1,
  },
  notificationScroll: {
    flex: 1,
    width: '100%',
    marginTop: 20,
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
  // Profile Styles
  profileContainer: {
    flexGrow: 1,
    backgroundColor: main,
    width: '100%',
  },
  profileOptionsContainer: {
    padding: 20,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: menu,
  },
  profileHeader: {
    flex: 3,
    backgroundColor: menu,
    width: '100%',
    paddingVertical: 15,
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
    padding: 12,
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
});

export default styles;
