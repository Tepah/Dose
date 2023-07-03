type profile = {
  followers: any;
  following: any;
  habits: any;
  description: any;
  name: string;
  username: string;
  profilePic: any;
};
export const mockProfile1: profile = {
  name: 'Pete Potipitak',
  username: '@petah',
  profilePic: require('../test/profile.png'),
  description: "If nobody believes in you, I'm nobody",
  following: 20,
  followers: 20,
  habits: [
    {
      name: 'Habit 1',
      description: 'This is habit 1',
      streak: 3,
    },
    {
      name: 'Habit 2',
      description: 'This is habit 2',
      streak: 2,
    },
    {
      name: 'Habit 3',
      description: 'This is habit 3',
      streak: 1,
    },
    {
      name: 'Habit 4',
      description: 'This is habit 3',
      streak: 1,
    },
    {
      name: 'Habit 5',
      description: 'This is habit 3',
      streak: 1,
    },
    {
      name: 'Habit 6',
      description: 'This is habit 3',
      streak: 1,
    },
  ],
};
