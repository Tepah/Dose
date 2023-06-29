import * as React from 'react';
import {useState} from 'react';
import {View, Text, Pressable, Image, ScrollView} from 'react-native';
import Styles from '../components/Styles';
import {mockProfile1} from '../test/mockProfile1';
const SocialScreen = () => {
  const navButton = (type: string, link: string) => {
    // TODO: Make notification button and search button work
    return (
      <Pressable style={Styles.navButtons}>
        <Image source={link} />
      </Pressable>
    );
  };
  const socialHeader = () => (
    <View style={Styles.header}>
      <Text style={[Styles.text, Styles.headerText]}>dose</Text>
      <View style={Styles.headerNav}>
        {navButton('search', require('../icons/search.png'))}
        {navButton('notification', require('../icons/notification.png'))}
      </View>
    </View>
  );

  const reactBar = () => {
    const [liked, setLiked] = useState(false);
    return (
      <View style={Styles.reactBar}>
        <View style={Styles.userInfo}>
          <Image
            style={Styles.userPostImage}
            source={mockProfile1.profilePic}
          />
          <Pressable>
            <Text style={[Styles.text, Styles.userText]}>
              {mockProfile1.username}
            </Text>
          </Pressable>
        </View>
        <View style={Styles.reactButtons}>
          <Pressable
            style={Styles.likeButton}
            onPress={() => setLiked(prevState => !prevState)}>
            <Image
              style={Styles.likeButtonImage}
              source={
                liked
                  ? require('../icons/heart-fill.png')
                  : require('../icons/heart.png')
              }
            />
          </Pressable>
        </View>
      </View>
    );
  };
  const postCaption = () => {
    return (
      <View style={Styles.postCaptionContainer}>
        <Text style={[Styles.text, Styles.caption]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Text>
      </View>
    );
  };
  const imagePost = () => {
    return (
      <View style={Styles.imagePostContainer}>
        <Image
          style={Styles.imagePost}
          source={require('../test/water.jpeg')}
        />
        {reactBar()}
        {postCaption()}
      </View>
    );
  };

  const challengePost = () => {
    return (
      <View style={Styles.challengePostContainer}>
        <View style={Styles.challengePost}>
          <View style={Styles.challengers}>
            <Image
              style={Styles.userPostImage}
              source={mockProfile1.profilePic}
            />
            <Text style={[Styles.text, Styles.userText]}>
              {mockProfile1.username}
            </Text>
          </View>
          <Text style={Styles.text}>challenged</Text>
          <View style={Styles.challengers}>
            <Image
              style={Styles.userPostImage}
              source={mockProfile1.profilePic}
            />
            <Text style={[Styles.text, Styles.userText]}>@tom</Text>
          </View>
        </View>
        {reactBar()}
        {postCaption()}
      </View>
    );
  };
  return (
    <View style={Styles.app}>
      {socialHeader()}
      <ScrollView style={Styles.socialView}>
        {imagePost()}
        {imagePost()}
        {challengePost()}
        {imagePost()}
      </ScrollView>
    </View>
  );
};

export default SocialScreen;
