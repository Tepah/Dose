import firestore from '@react-native-firebase/firestore';

type UserChanges = {
  description: string;
  name: string;
  profilePic: any;
  private: boolean;
};

export const updateUser = (user: string, changes: UserChanges) => {
  firestore()
    .collection('Users')
    .doc(user)
    .update(changes)
    .then(() => console.log('User updated!'));
};
