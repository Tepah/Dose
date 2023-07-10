type profile = {
  followers: any;
  following: any;
  habits: any;
  description: any;
  name: string;
  username: string;
  startDate: string;
  profilePic: any;
};
export const mockProfile1: profile = {
  name: 'Pete Potipitak',
  username: '@petah',
  profilePic: require('../test/profile.png'),
  description: "If nobody believes in you, I'm nobody",
  following: 20,
  followers: 20,
  startDate: '7/5/2023',
  habits: [
    {
      name: 'Habit 1',
      description: 'This is habit 1',
      streak: 3,
      progress: {
        '7/3/2023': true,
        '7/4/2023': true,
        '7/5/2023': true,
        '7/6/2023': true,
        '7/7/2023': false,
        '7/8/2023': true,
        '7/9/2023': true,
      },
    },
    {
      name: 'Habit 2',
      description: 'This is habit 2',
      streak: 2,
      progress: {
        '7/3/2023': true,
        '7/4/2023': true,
        '7/5/2023': true,
        '7/6/2023': true,
        '7/7/2023': true,
        '7/8/2023': false,
        '7/9/2023': true,
        '7/10/2023': false,
      },
    },
    {
      name: 'Habit 3',
      description: 'This is habit 3',
      streak: 0,
      progress: {
        '7/3/2023': true,
        '7/4/2023': true,
        '7/5/2023': true,
        '7/6/2023': true,
        '7/7/2023': true,
        '7/8/2023': true,
        '7/9/2023': false,
        '7/10/2023': true,
      },
    },
    {
      name: 'Habit 4',
      description: 'This is habit 4',
      streak: 1,
      progress: {
        '7/3/2023': true,
        '7/4/2023': true,
        '7/5/2023': true,
        '7/6/2023': true,
        '7/7/2023': true,
        '7/8/2023': false,
        '7/9/2023': true,
        '7/10/2023': false,
      },
    },
    {
      name: 'Habit 5',
      description: 'This is habit 5',
      streak: 1,
      progress: {
        '7/5/2023': true,
        '7/6/2023': true,
        '7/7/2023': true,
        '7/8/2023': true,
        '7/9/2023': false,
        '7/10/2023': true,
      },
    },
    {
      name: 'Habit 6',
      description: 'This is habit 6',
      streak: 1,
      progress: {
        '7/3/2023': true,
        '7/4/2023': true,
        '7/5/2023': true,
        '7/6/2023': true,
        '7/7/2023': true,
        '7/8/2023': true,
        '7/9/2023': false,
        '7/10/2023': false,
      },
    },
  ],
};
