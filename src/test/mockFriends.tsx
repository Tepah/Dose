import {ImageSourcePropType} from 'react-native';

type friend = {
  userID: number;
  username: string;
  profilePic: ImageSourcePropType;
};

export const mockFriends: friend[] = [
  {
    userID: 1,
    username: '@John',
    profilePic: require('../test/profile.png'),
  },
  {
    userID: 2,
    username: '@Tom',
    profilePic: require('../test/profile.png'),
  },
  {
    userID: 3,
    username: '@Petah',
    profilePic: require('../test/profile.png'),
  },
  {
    userID: 4,
    username: '@guy',
    profilePic: require('../test/profile.png'),
  },
];
