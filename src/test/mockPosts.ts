type post = {
  postID: number;
  username: string;
  postType: string;
  postContent: string;
  postDate: string;
  postLikes: number;
  postComments: {[key: string]: string}[];
  image?: any;
  challenger?: string;
};

export const mockPosts: post[] = [
  {
    postID: 1,
    username: '@petah',
    postType: 'image',
    image: require('../test/water.jpeg'),
    postContent: 'This is a text post',
    postDate: '2022-04-01',
    postLikes: 10,
    postComments: [
      {'@tommyboy': 'i wish I drank...'},
    ],
  },
  {
    postID: 2,
    username: '@petah',
    postType: 'challenge',
    postContent: "Don't wuss out.",
    postDate: '2021-03-01',
    postLikes: 10,
    postComments: [
      {'@tommyboy': 'how come...'},
      {'@headturner': 'Hell yeah!!!'},
    ],
    challenger: '@tommyboy',
  },
  {
    postID: 3,
    username: '@petah',
    postType: 'image',
    image: require('../test/water.jpeg'),
    postContent: "I'm just floating",
    postDate: '2021-03-01',
    postLikes: 10,
    postComments: [
      {'@tommyboy': 'dude I like that'},
      {'@awesomeus': 'i need to drink water'},
    ],
  },
  {
    postID: 4,
    username: '@petah',
    postType: 'image',
    image: require('../test/water.jpeg'),
    postContent: 'I drink so much damn water.',
    postDate: '2021-03-01',
    postLikes: 10,
    postComments: [
      {'@tommyboy': 'hydrohomies'},
    ],
  },
  {
    postID: 5,
    username: '@petah',
    postType: 'image',
    image: require('../test/water.jpeg'),
    postContent: 'why do I feel like swimming so much? I think I just want to read a book every',
    postDate: '2021-03-01',
    postLikes: 10,
    postComments: [
      {'@dennisturner': 'i need to drink water'},
    ],
  },
];
