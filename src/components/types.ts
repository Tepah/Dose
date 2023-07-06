export type friend = {
  userID: number;
  username: string;
  profilePic: string;
};

export type profile = {
  followers: any;
  following: any;
  habits: any;
  description: any;
  name: string;
  username: string;
  startDate: string;
  profilePic: any;
};

export type post = {
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

export type HabitType = {
  name: string;
  description: string;
  streak: number;
};
