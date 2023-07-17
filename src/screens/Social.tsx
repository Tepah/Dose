import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  ImageSourcePropType,
  Modal,
  TextInput,
} from 'react-native';
import Styles from '../components/Styles';
import {mockProfileList} from '../test/mockProfile1';
import LinearGradient from 'react-native-linear-gradient';

// TODO: Make a friends page
const SocialScreen = ({navigation}: any) => {
  const navButton = (
    type: string,
    link: ImageSourcePropType,
  ) => {
    // TODO: Make notification button and search button work
    return (
      <View style={Styles.navButtons}>
        <Pressable
          style={Styles.navButtons}
          onPress={() => navigation.navigate(type)}>
          <Image source={link} />
        </Pressable>
      </View>
    );
  };
  const socialHeader = () => (
    <View style={Styles.header}>
      <Text style={[Styles.text, Styles.headerText]}>dose</Text>
      <View style={Styles.headerNav}>
        {navButton('Search', require('../icons/search.png'))}
        {navButton('Notification', require('../icons/notification.png'))}
      </View>
    </View>
  );
  const postCaption = () => {
    // TODO: Make a more button that expands the caption and opens post modal
    return (
      <View style={Styles.postCaptionContainer}>
        <Text style={[Styles.text, Styles.caption]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          <Text style={[Styles.text, Styles.commentSmallBold]}>...more</Text>
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
        <LinearGradient
          colors={['#1D2B3E', '#344966']}
          style={Styles.postDetailMiniContainer}>
          <ReactBar />
          {postCaption()}
          <MiniComments />
        </LinearGradient>
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
              source={mockProfileList['@petah'].profilePic}
            />
            <Text style={[Styles.text, Styles.userText]}>
              {mockProfileList['@petah'].username}
            </Text>
          </View>
          <Text style={Styles.text}>challenged</Text>
          <View style={Styles.challengers}>
            <Image
              style={Styles.userPostImage}
              source={mockProfileList['@petah'].profilePic}
            />
            <Text style={[Styles.text, Styles.userText]}>@tom</Text>
          </View>
        </View>
        <LinearGradient
          colors={['#1D2B3E', '#344966']}
          style={Styles.postDetailMiniContainer}>
          <ReactBar />
          {postCaption()}
          <MiniComments />
        </LinearGradient>
      </View>
    );
  };
  // TODO: make a pressable that opens a modal with the post
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

const MiniComments = () => {
  return (
    <View style={Styles.commentsContainer}>
      <View style={Styles.userComment}>
        <Text style={[Styles.commentSmallBold]}>@Tom</Text>
        <Text> </Text>
        <Text style={Styles.commentText}>i wish i drank..</Text>
      </View>
      <Text style={Styles.commentSmallBold}>more comments..</Text>
    </View>
  );
};

const ReactBar = () => {
  // TODO: make this a modal that pops up with a text input
  const [commentField, setCommentField] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <View style={Styles.reactBar}>
      <View style={Styles.userInfo}>
        <Image
          style={Styles.userPostImage}
          source={mockProfileList['@petah'].profilePic}
        />
        <Pressable>
          <Text style={[Styles.text, Styles.userText]}>
            {mockProfileList['@petah'].username}
          </Text>
        </Pressable>
      </View>
      <View style={Styles.reactButtons}>
        <Pressable
          style={Styles.commentButton}
          onPress={() => setCommentField(current => !current)}>
          <Image
            style={Styles.commentButtonImage}
            source={require('../icons/comment.png')}
          />
        </Pressable>
        <CommentField visible={commentField} setVisible={setCommentField} />
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

interface CommentFieldProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentField = ({visible, setVisible}: CommentFieldProps) => {
  return (
    <Modal visible={visible} transparent={true}>
      <Pressable onPress={() => setVisible(current => !current)}>
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            height: 100,
            width: 100,
          }}>
          <TextInput placeholder="Comment" />
        </View>
      </Pressable>
    </Modal>
  );
};

export default SocialScreen;
