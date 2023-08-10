import React, {createContext} from 'react';
import {ProfileType} from '../components/types';

const initialState: {
  username: string;
  profile: ProfileType | undefined;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType | undefined>>;
} = {
  username: '',
  profile: {} as ProfileType,
  setProfile: () => {},
};

// Create a context instance
const UserContext = createContext(initialState);

export default UserContext;
