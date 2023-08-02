import storage from '@react-native-firebase/storage';

export const uploadProfilePic = async (uri: string, uid: string) => {
  console.log('uploading profile pic');
  try {
    const ref = storage().ref('profilePics/' + uid);
    await ref.putFile(uri);
    const url = await ref.getDownloadURL();
    return url;
  } catch (err) {
    console.error('Error getting image URL: ', err);
    return null;
  }
};
