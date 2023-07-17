import React from 'react';
import {View, Text, ScrollView, Image, Pressable} from 'react-native';
import Styles from '../components/Styles';
import {useState} from 'react';
import {mockPosts} from '../test/mockPosts';
import {HabitType} from '../components/types';

const ProfileScreen = ({route}: any) => {
  console.log(route.params);
  const {user} = route.params;
  console.log(user);

  const profileCounter = (type: string) => {
    return (
      <View style={Styles.followContainer}>
        <Text style={[Styles.text, Styles.profileHeaderText]}>{type}</Text>
        <Text style={[Styles.text, Styles.followCount]}>
          {type === 'Habits'
            ? user.habits.length
            : type === 'Following'
            ? user.following
            : user.followers}
        </Text>
      </View>
    );
  };

  const profileInfo = (
    <View style={Styles.profileHeader}>
      <View style={Styles.profileHeaderUser}>
        <Image source={user.profilePic} style={Styles.profilePicture} />
        <Text style={[Styles.text, Styles.profileNameText]}>
          {user.username}
        </Text>
      </View>
      {profileCounter('Habits')}
      {profileCounter('Following')}
      {profileCounter('Followers')}
    </View>
  );

  const [selected, setSelected] = useState(true);
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

  const profileDescription = (
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

  const mappedHabits = user.habits.map((habit: HabitType) => {
    return (
      <View style={Styles.profileHabit}>
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

  const mediaTab = () => {
    const mapPosts = mockPosts.map(post => {
      let postContent = null;
      if (post.postType === 'image') {
        postContent = (
          <Image source={post.image} style={Styles.postSquareImage} />
        );
      } else if (post.postType === 'challenge') {
        // TODO: Add challenge image
        postContent = (
          <View style={Styles.postSquareChallenge}>
            <Text style={[Styles.text, Styles.challengeSquareText]}>VS</Text>
            <Text style={[Styles.text, Styles.challengeSquareChallenger]}>
              {post.challenger}
            </Text>
          </View>
        );
      }

      return (
        <Pressable
          style={Styles.postSquare}
          onPress={() => console.log(post.postType)}>
          {postContent}
        </Pressable>
      );
    });

    return <View style={Styles.mediaTabContainer}>{mapPosts}</View>;
  };

  return (
    <View style={Styles.app}>
      <ScrollView style={Styles.profileContainer}>
        <ProfileOptions />
        {profileInfo}
        {profileDescription}
        {profileTabs()}
        {!selected ? (
          mediaTab()
        ) : (
          <View style={Styles.profileHabitsContainer}>{mappedHabits}</View>
        )}
      </ScrollView>
    </View>
  );
};

const ProfileOptions = () => {
  return (
    <View style={Styles.profileOptionsContainer}>
    </View>
  );
};

export default ProfileScreen;
