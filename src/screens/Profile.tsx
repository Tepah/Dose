import React from 'react';
import {View, Text, ScrollView, Image, Pressable} from 'react-native';
import Styles from '../components/Styles';
import {mockProfile1} from '../test/mockProfile1';
import {useState} from 'react';
import {mockPosts} from '../test/mockPosts';

const ProfileScreen = () => {
  const profileCounter = (type: string) => {
    return (
      <View style={Styles.followContainer}>
        <Text style={[Styles.text, Styles.profileHeaderText]}>Habits</Text>
        <Text style={[Styles.text, Styles.followCount]}>
          {type === 'habits'
            ? mockProfile1.habits.length
            : type === 'following'
            ? mockProfile1.following
            : mockProfile1.followers}
        </Text>
      </View>
    );
  };

  const profileInfo = (
    <View style={Styles.profileHeader}>
      <View style={Styles.profileHeaderUser}>
        <Image source={mockProfile1.profilePic} style={Styles.profilePicture} />
        <Text style={[Styles.text, Styles.profileNameText]}>
          {mockProfile1.username}
        </Text>
      </View>
      {profileCounter("habits")}
      {profileCounter("following")}
      {profileCounter("followers")}
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
    return (
      <View style={Styles.profileTabsContainer}>
        <Pressable
          onPress={() => onTabPress('Habits')}
          style={[
            Styles.profileTabButton,
            selected ? Styles.profileTabSelected : null,
          ]}>
          <Text style={[Styles.text, Styles.profileTabText]}>Habits</Text>
        </Pressable>
        <Pressable
          onPress={() => onTabPress('Media')}
          style={[
            Styles.profileTabButton,
            selected ? null : Styles.profileTabSelected,
          ]}>
          <Text style={[Styles.text, Styles.profileTabText]}>Media</Text>
        </Pressable>
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
        {mockProfile1.description}
      </Text>
    </View>
  );

  type habitType = {
    name: string;
    description: string;
    streak: number;
  };

  const mappedHabits = mockProfile1.habits.map((habit: habitType) => {
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

export default ProfileScreen;
