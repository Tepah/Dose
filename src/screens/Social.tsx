import * as React from 'react';
import {useState} from 'react';
import {View, Text, Pressable, Image, ScrollView} from 'react-native';
import Styles from '../components/Styles';

const SocialScreen = () => {
  const navButton = (type: string, link: string) => {
    // TODO: Make notification button and search button
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
            source={require('../test/profile.png')} />
          <Pressable>
            <Text style={[Styles.text, Styles.userText]}>@petah</Text>
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
  const imagePost = () => {
    return (
      <View style={Styles.imagePostContainer}>
        <Image
          style={Styles.imagePost}
          source={require('../test/water.jpeg')}
        />
        {reactBar()}
        <View style={Styles.postCaptionContainer}>
          <Text style={[Styles.text, Styles.caption]}>
            started their dose of water
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={Styles.app}>
      {socialHeader()}
      <ScrollView style={Styles.socialView}>
        {imagePost()}
        {imagePost()}
        {imagePost()}
      </ScrollView>
    </View>
  );
};

export default SocialScreen;
