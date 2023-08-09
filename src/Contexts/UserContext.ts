import {createContext} from 'react';

const initialState = {
  username: '',
  profile: {},
};

// Create a context instance
const UserContext = createContext(initialState);

export default UserContext;
