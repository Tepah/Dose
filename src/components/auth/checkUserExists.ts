import firestore from '@react-native-firebase/firestore';

export const checkUserExists = async (email: string, username: string) => {
  const usersWithEmail = await firestore()
    .collection('Users')
    .where('email', '==', email)
    .get();
  const usersWithUsername = await firestore()
    .collection('Users')
    .where('username', '==', username)
    .get();
  if (usersWithEmail.size > 0 || usersWithUsername.size > 0) {
    console.log('User with email already exists');
    return true;
  }
  return false;
};
