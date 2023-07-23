export type friend = {
  userID: number;
  username: string;
  profilePic: string;
};

export type profile = {
  followers: any;
  following: any;
  habits: HabitType[];
  description: string;
  private: boolean;
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
  postComments: {[key: string]: string}[];
  image?: any;
  challenger?: string;
};

export type HabitType = {
  name: string;
  description: string;
  streak: number;
  progress: {[key: string]: boolean};
};
