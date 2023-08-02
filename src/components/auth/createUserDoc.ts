import firestore from '@react-native-firebase/firestore';
import {ProfileType} from '../types';

export default async function createUserDoc(user: ProfileType) {
  firestore()
    .collection('Users')
    .doc(user.username.toLowerCase())
    .set(user)
    .then(() => {
      console.log('User added!');
    });
}
