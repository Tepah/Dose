import storage from '@react-native-firebase/storage';

export const uploadProfilePic = async (uri: string | null, uid: string) => {
  console.log('uploading profile pic');
  try {
    const ref = storage().ref('profilePics/' + uid);
    if (typeof uri === 'string') {
      await ref.putFile(uri);
    }
    let url = '';
    await ref.getDownloadURL().then(result => {
      url = result;
    });
    console.log(url);
    return url;
  } catch (err) {
    console.error('Error getting image URL: ', err);
    return null;
  }
};
