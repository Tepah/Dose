type post = {
  postID: number;
  username: string;
  postType: string;
  postContent: string;
  postDate: string;
  postLikes: number;
  postComments: number;
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
    postComments: 5,
  },
  {
    postID: 2,
    username: '@petah',
    postType: 'challenge',
    postContent: "Don't wuss out.",
    postDate: '2021-03-01',
    postLikes: 10,
    postComments: 5,
    challenger: '@tom',
  },
  {
    postID: 3,
    username: '@petah',
    postType: 'image',
    image: require('../test/water.jpeg'),
    postContent: 'This is a text post',
    postDate: '2021-03-01',
    postLikes: 10,
    postComments: 5,
  },
  {
    postID: 4,
    username: '@petah',
    postType: 'image',
    image: require('../test/water.jpeg'),
    postContent: 'This is a text post',
    postDate: '2021-03-01',
    postLikes: 10,
    postComments: 5,
  },
  {
    postID: 5,
    username: '@petah',
    postType: 'image',
    image: require('../test/water.jpeg'),
    postContent: 'This is a text post',
    postDate: '2021-03-01',
    postLikes: 10,
    postComments: 5,
  },
];
