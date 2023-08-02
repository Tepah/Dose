import {uploadProfilePic} from '../photo/changeProfilePic';
import {createEmailUser} from './emailSignUp';
import {ProfileType} from '../types';
import createUserDoc from './createUserDoc';

export const createUserOnPress = (selectedImage, email, password, name, birthday, username) => {
  if (
    selectedImage === null ||
    email === '' ||
    password === '' ||
    name === '' ||
    birthday === '' ||
    username === ''
  ) {
    console.log(
      'missing parameters: ' +
      (!email ? 'email ' : '') +
      (!password ? 'password ' : '') +
      (!name ? 'name ' : '') +
      (!birthday ? 'birthday ' : '') +
      (!username ? 'username ' : ''),
    );
    return false;
  }
  if (checkUserExists(email, username)) {
    return false;
  }
  const profilePicUrl = uploadProfilePic(selectedImage, username);
  if (createdNewUser) {
    const user: ProfileType = {
      username: '@' + username.toLowerCase(),
      name: name.toLowerCase(),
      birthday: birthday,
      email: email.toLowerCase(),
      private: false,
      followers: [],
      following: [],
      habits: [],
      description: '',
      startDate: new Date().toLocaleDateString('en-US'),
      profilePic: profilePicUrl,
    };
    createUserDoc(user);
    return true
  }
};
