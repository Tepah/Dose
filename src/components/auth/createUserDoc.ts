import firestore from '@react-native-firebase/firestore';
import {profile} from '../types';

export default async function createUserDoc(user: profile) {
  firestore()
    .collection('Users')
    .doc(user.username)
    .set(user)
    .then(() => {
      console.log('User added!');
    });
}
