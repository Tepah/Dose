import React from 'react';
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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Styles from '../components/Styles';
import {mockProfileList} from '../test/mockProfile1';
import LinearGradient from 'react-native-linear-gradient';
import {mockPosts} from '../test/mockPosts';
import {post} from '../components/types';
import { PostModal } from "./Modals/PostModal";

const CONTENT_STRING_SIZE: number = 65;

// TODO: Make a friends page
const SocialScreen = ({navigation}: any) => {
  const navButton = (type: string, link: ImageSourcePropType) => {
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
  const imagePost = (post: post, index: number) => {
    return (
      <View key={index} style={Styles.imagePostContainer}>
        <Image style={Styles.imagePost} source={post.image} />
        <PostDetailContainer navigation={navigation} post={post} />
      </View>
    );
  };

  const challengePost = (post: post, index: number) => {
    return (
      <View key={index} style={Styles.challengePostContainer}>
        <View style={Styles.challengePost}>
          <View style={Styles.challengers}>
            <Image
              style={Styles.userPostImage}
              source={mockProfileList[post.username].profilePic}
            />
            <Text style={[Styles.text, Styles.userText]}>
              {mockProfileList[post.username].username}
            </Text>
          </View>
          <Text style={Styles.text}>challenged</Text>
          <View style={Styles.challengers}>
            <Image
              style={Styles.userPostImage}
              source={mockProfileList[post.challenger].profilePic}
            />
            <Text style={[Styles.text, Styles.userText]}>{post.challenger}</Text>
          </View>
        </View>
        <PostDetailContainer navigation={navigation} post={post} />
      </View>
    );
  };

  const renderPosts = mockPosts.map((post, index) => {
    if (post.postType === 'image') {
      return imagePost(post, index);
    } else if (post.postType === 'challenge') {
      return challengePost(post, index);
    }
  });

  return (
    <View style={Styles.app}>
      {socialHeader()}
      <ScrollView style={Styles.socialView} keyboardShouldPersistTaps="always">
        {renderPosts}
      </ScrollView>
    </View>
  );
};

const MiniComments = (prop: {post: post; navigation: any}) => {
  let username = Object.keys(prop.post.postComments[0])[0];
  let comment = Object.values(prop.post.postComments[0])[0];
  return (
    <View style={Styles.commentsContainer}>
      <View style={Styles.userComment}>
        <Pressable
          onPress={() =>
            prop.navigation.navigate('Profile', {
              user: mockProfileList[username],
            })
          }>
          <Text style={[Styles.commentSmallBold]}>{username}</Text>
        </Pressable>
        <Text> </Text>
        <Text style={Styles.commentText}>{comment}</Text>
      </View>
      {prop.post.postComments.length > 1 ? (
        <Text style={Styles.commentSmallBold}>more comments..</Text>
      ) : null}
    </View>
  );
};

export const ReactBar = (prop: {post: post; navigation: any}) => {
  const [commentField, setCommentField] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <View style={Styles.reactBar}>
      <Pressable
        onPress={() =>
          prop.navigation.navigate('Profile', {
            user: mockProfileList[prop.post.username],
          })
        }>
        <View style={Styles.userInfo}>
          <Image
            style={Styles.userPostImage}
            source={mockProfileList[prop.post.username].profilePic}
          />
          <Text style={[Styles.text, Styles.userText]}>
            {mockProfileList[prop.post.username].username}
          </Text>
        </View>
      </Pressable>
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

const PostDetailContainer = (prop: {post: post; navigation: any}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const postCaption = () => {
    return (
      <View style={Styles.postCaptionContainer}>
        <Text style={[Styles.text, Styles.caption]}>
          {prop.post.postContent.slice(0, CONTENT_STRING_SIZE)}
          {prop.post.postContent.length <= CONTENT_STRING_SIZE ? null : (
            <Text style={[Styles.text, Styles.commentSmallBold]}>...more</Text>
          )}
        </Text>
      </View>
    );
  };
  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <LinearGradient
          colors={['#1D2B3E', '#344966']}
          style={Styles.postDetailMiniContainer}>
          <ReactBar navigation={prop.navigation} post={prop.post} />
          {postCaption()}
          <MiniComments post={prop.post} navigation={prop.navigation} />
        </LinearGradient>
      </Pressable>
      <PostModal
        post={prop.post}
        navigation={prop.navigation}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </View>
  );
};

interface CommentFieldProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentField = ({visible, setVisible}: CommentFieldProps) => {
  const closeModalPress = () => {
    setVisible(false);
  };

  // TODO: make this send the comment to the backend
  const sendCommentPress = () => {
    setVisible(false);
  };
  return (
    <Modal visible={visible} transparent={true}>
      <TouchableWithoutFeedback onPress={() => closeModalPress()}>
        <View style={Styles.inputFieldBackground}></View>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Styles.commentFieldContainer}>
        <LinearGradient
          colors={['#1D2B3E', '#344966']}
          style={Styles.inputBarContainer}>
          <TextInput
            style={[Styles.input, Styles.inputBar]}
            autoFocus={true}
            placeholder="Comment.."
          />
          <Pressable
            onPress={() => sendCommentPress()}
            style={Styles.inputBarButton}>
            <Image source={require('../icons/send.png')} />
          </Pressable>
        </LinearGradient>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SocialScreen;
