import firestore from '@react-native-firebase/firestore';

export const postPost = async (
  habitId: string | undefined,
  postType: string,
  postContent: string,
  image: string,
) => {
  try {
    const postRef = firestore().collection('Posts').doc();
    await postRef.set({
      habitId: habitId,
      postType: postType,
      postContent: postContent,
      postDate: new Date().toLocaleDateString('en-US'),
      postComments: [],
      postLikes: [],
      image: image,
    });
  } catch (err) {
    console.log('Error creating post: ', err);
  }
};
