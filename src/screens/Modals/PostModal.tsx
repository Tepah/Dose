import {PostType} from '../../components/types';
import React, {useRef} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Styles from '../../components/Styles';
import LinearGradient from 'react-native-linear-gradient';
import {ReactBar} from '../Social';
import {mockProfileList} from '../../test/mockProfile1';

type Props = {
  post: PostType;
  navigation: any;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostModal = ({post, navigation, visible, setVisible}: Props) => {
  const scrollViewRef = useRef(null);

  const onScrollEnd = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    if (contentOffsetY < -150) {
      closeModal();
    }
  };
  const closeModal = () => {
    setVisible(false);
  };
  const postCaption = () => {
    return (
      <View style={Styles.postCaptionContainer}>
        <Text style={[Styles.text, Styles.caption]}>{post.postContent}</Text>
      </View>
    );
  };

  const mapComments = post.postComments.map((comment, index) => {
    return (
      <LinearGradient
        key={index}
        colors={['#344966', '#2A3E59']}
        style={Styles.postCommentContainer}>
        <View style={Styles.userComment}>
          <Pressable
            onPress={() => {
              navigation.navigate('Profile', {
                user: mockProfileList[Object.keys(comment)[0]],
              });
              closeModal();
            }}>
            <Text style={[Styles.commentSmallBold]}>
              {Object.keys(comment)[0]}
            </Text>
          </Pressable>
          <Text> </Text>
          <Text style={Styles.commentText}>{Object.values(comment)[0]}</Text>
        </View>
      </LinearGradient>
    );
  });

  return (
    <Modal visible={visible} transparent animationType={'slide'}>
      <View style={Styles.postModalContainer}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={onScrollEnd}
          scrollEventThrottle={16}
          style={Styles.postModalScroll}
          keyboardShouldPersistTaps={'handled'}>
          <Image style={Styles.imagePost} source={post.image} />
          <LinearGradient
            colors={['#1D2B3E', '#344966']}
            style={Styles.postDetailContainer}>
            <ReactBar navigation={navigation} post={post} />
            {postCaption()}
          </LinearGradient>
          {mapComments}
          <View style={Styles.commentFieldContainer}>
            <TextInput />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
