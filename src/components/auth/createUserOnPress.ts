import {uploadProfilePic} from '../photo/changeProfilePic';
import {ProfileType} from '../types';
import createUserDoc from './createUserDoc';
import {checkUserExists} from './checkUserExists';

export const createUserOnPress = async (
  selectedImage: string | null,
  email: string,
  password: string,
  name: string,
  birthday: string,
  username: string,
) => {
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
  if (!(await checkUserExists(email, username))) {
    return true;
  }
};
