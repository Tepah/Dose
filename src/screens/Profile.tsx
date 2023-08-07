import React, {useEffect} from 'react';
import {View, Text, ScrollView, Image, Pressable} from 'react-native';
import Styles from '../components/Styles';
import {useState} from 'react';
import {mockPosts} from '../test/mockPosts';
import {HabitType, PostType, ProfileType} from '../components/types';
import {CloseButton} from '../components/Close';
import {SettingsModal} from './Modals/Settings';
import {PostModal} from './Modals/PostModal';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getUser} from '../components/firestore/getUser';

const ProfileScreen = ({route}: any) => {
  const {username, currentUser} = route.params;
  const isFocused = useIsFocused();
  const [selected, setSelected] = useState(true);
  const [user, setUser] = useState<ProfileType | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setUser(await getUser(username));
      } catch (err) {
        console.error('Error getting user data: ', err);
      }
    };
    getUserData();
  }, [isFocused]);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);
  const profileTabs = () => {
    const onTabPress = (value: string) => {
      if (value === 'Habits' && !selected) {
        setSelected(true);
      } else if (value === 'Media' && selected) {
        setSelected(false);
      }
    };

    const renderTab = (type: string) => {
      return (
        <Pressable
          onPress={() => onTabPress(type)}
          style={[
            Styles.profileTabButton,
            selected && type === 'Habits'
              ? Styles.profileTabSelected
              : !selected && type === 'Media'
              ? Styles.profileTabSelected
              : null,
          ]}>
          <Text style={[Styles.text, Styles.profileTabText]}>{type}</Text>
        </Pressable>
      );
    };
    return (
      <View style={Styles.profileTabsContainer}>
        {renderTab('Habits')}
        {renderTab('Media')}
      </View>
    );
  };

  const mappedHabits = user?.habits.map((habit: HabitType, index: number) => {
    return (
      <View key={index} style={Styles.profileHabit}>
        <Text style={[Styles.text, Styles.proHabitText]}>{habit.name}</Text>
        <Text style={[Styles.text, Styles.proHabitDescriptionText]}>
          {habit.description}
        </Text>
        <Text style={[Styles.text, Styles.proHabitStreakText]}>
          Going for {habit.streak} days
        </Text>
      </View>
    );
  });

  if (loading || !user) {
    return null;
  }
  console.log(user);

  return (
    <View style={Styles.app}>
      {currentUser === user?.username ? (
        <ProfileOptions user={user} />
      ) : (
        <Header />
      )}
      <ScrollView style={Styles.profileContainer}>
        <ProfileInfo user={user} currentUser={currentUser} />
        <ProfileDescription user={user} />
        {profileTabs()}
        {!selected ? (
          <MediaTab posts={user.posts} />
        ) : (
          <View style={Styles.profileHabitsContainer}>{mappedHabits}</View>
        )}
      </ScrollView>
    </View>
  );
};

const ProfileOptions = (props: {user: ProfileType}) => {
  const [settingsVisible, setSettingsVisible] = useState(false);
  return (
    <View style={Styles.profileSpacing}>
      <View style={Styles.profileOptionsContainer}>
        <Pressable
          style={Styles.profileOptionsButton}
          onPress={() => setSettingsVisible(true)}>
          <Image
            style={Styles.profileOptionsImages}
            source={require('../icons/settings.png')}
          />
        </Pressable>
      </View>
      <SettingsModal
        user={props.user}
        visible={settingsVisible}
        setVisible={setSettingsVisible}
      />
    </View>
  );
};
const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={Styles.profileSpacing}>
      <CloseButton type={'back'} closeFunction={() => navigation.goBack()} />
    </View>
  );
};

const ProfileInfo = ({user, currentUser}: any) => {
  const profileCounter = (type: string) => {
    return (
      <View style={Styles.followContainer}>
        <Text style={[Styles.text, Styles.profileHeaderText]}>{type}</Text>
        <Text style={[Styles.text, Styles.followCount]}>
          {type === 'Habits'
            ? user.habits.length
            : type === 'Following'
            ? user.following.length
            : user.followers.length}
        </Text>
      </View>
    );
  };
  return (
    <View>
      <View style={Styles.profileHeader}>
        <View style={Styles.profileHeaderUser}>
          <Image
            source={{uri: user.profilePic}}
            style={Styles.profilePicture}
          />
          <Text style={[Styles.text, Styles.profileNameText]}>
            {user.username}
          </Text>
        </View>
        {profileCounter('Habits')}
        {profileCounter('Following')}
        {profileCounter('Followers')}
      </View>
      {user.username !== currentUser ? <ProfileButtons user={user} /> : null}
    </View>
  );
};

const ProfileButtons = ({user}: any) => {
  // TODO: Implement following
  // if (currentUser.following.includes('@' + user.username)) {
  //   return (
  //     <View style={Styles.profileButtonsContainer}>
  //       <Pressable style={Styles.profileButton}>
  //         <Text style={[Styles.paragraphText]}>Unfollow</Text>
  //       </Pressable>
  //     </View>
  //   );
  // }
  return (
    <View style={Styles.profileButtonsContainer}>
      <Pressable style={Styles.profileButton}>
        <Text style={[Styles.paragraphText]}>Challenge</Text>
      </Pressable>
      <Pressable style={Styles.profileButton}>
        <Text style={[Styles.paragraphText]}>Follow</Text>
      </Pressable>
    </View>
  );
};

const ProfileDescription = ({user}: any) => {
  return (
    <View style={Styles.profileDescriptionContainer}>
      <Text
        style={[
          Styles.paragraphText,
          {fontStyle: 'italic', textAlign: 'center'},
        ]}>
        {user.description}
      </Text>
    </View>
  );
};

const MediaTab = (props: {posts: PostType[]}) => {
  console.log(props.posts);
  const renderPosts = props.posts.map((post: PostType, index) => {
    if (post.postType === 'image') {
      return <ImagePost key={index} post={post} />;
    } else if (post.postType === 'challenge') {
      return <ChallengePost key={index} post={post} />;
    }
  });

  if (props.posts.length === 0) {
    return (
      <View style={Styles.mediaTabContainer}>
        <Text style={[Styles.text]}>No posts to show</Text>
      </View>
    );
  }

  return <View style={Styles.mediaTabContainer}>{renderPosts}</View>;
};

type PostProps = {post: PostType};
const ImagePost = (prop: PostProps) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={Styles.postSquare}>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}>
        <Image source={prop.post.image} style={Styles.postSquareImage} />
      </Pressable>
      <PostModal
        post={prop.post}
        navigation={navigation}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </View>
  );
};

const ChallengePost = (prop: PostProps) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={Styles.postSquare}>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}>
        <View style={Styles.postSquareChallenge}>
          <Text style={[Styles.text, Styles.challengeSquareText]}>VS</Text>
          <Text style={[Styles.text, Styles.challengeSquareChallenger]}>
            {prop.post.challenger}
          </Text>
        </View>
      </Pressable>
      <PostModal
        post={prop.post}
        navigation={navigation}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </View>
  );
};

export default ProfileScreen;
