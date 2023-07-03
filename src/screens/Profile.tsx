import * as React from 'react';
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import Styles from '../components/Styles';
import {mockProfile1} from '../test/mockProfile1';
import {useState} from 'react';
import { mockPosts } from "../test/mockPosts";

const ProfileScreen = () => {
  const profileInfo = (
    <View style={Styles.profileHeader}>
      <View style={Styles.profileHeaderUser}>
        <Image source={mockProfile1.profilePic} style={Styles.profilePicture} />
        <Text style={[Styles.text, Styles.profileNameText]}>
          {mockProfile1.username}
        </Text>
      </View>
      <View style={Styles.followContainer}>
        <Text style={[Styles.text, Styles.profileHeaderText]}>Habits</Text>
        <Text style={[Styles.text, Styles.followCount]}>{Object.keys(mockProfile1.habits).length}</Text>
      </View>
      <View style={Styles.followContainer}>
        <Text style={[Styles.text, Styles.profileHeaderText]}>Following</Text>
        <Text style={[Styles.text, Styles.followCount]}>
          {mockProfile1.following}
        </Text>
      </View>
      <View style={Styles.followContainer}>
        <Text style={[Styles.text, Styles.profileHeaderText]}>Followers</Text>
        <Text style={[Styles.text, Styles.followCount]}>
          {mockProfile1.followers}
        </Text>
      </View>
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

  const mappedHabits = Object.keys(mockProfile1.habits).map(habit => {
    return (
      <View style={Styles.profileHabit}>
        <Text style={[Styles.text, Styles.proHabitText]}>
          {mockProfile1.habits[habit].name}
        </Text>
        <Text style={[Styles.text, Styles.proHabitDescriptionText]}>
          {mockProfile1.habits[habit].description}
        </Text>
        <Text style={[Styles.text, Styles.proHabitStreakText]}>
          Going for {mockProfile1.habits[habit].streak} days
        </Text>
      </View>
    );
  });

  const mediaTab = () => {
    const mapPosts = mockPosts.map(post => {
      let postContent = null;
      if (post.postType === 'image') {
        postContent = <Image source={post.image} style={Styles.postSquareImage} />
      } else if (post.postType == 'challenge') {
        // TODO: Add challenge image
        postContent = (
          <View style={Styles.postSquareChallenge}>
            <Text style={[Styles.text, Styles.challengeSquareText]}>VS</Text>
            <Text style={[Styles.text, Styles.challengeSquareChallenger]}>{post.challenger}</Text>
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
