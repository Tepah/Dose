export type friend = {
  userID: number;
  username: string;
  profilePic: string;
};

export type ProfileType = {
  followers: any;
  following: any;
  habits: HabitType[];
  description: string;
  private: boolean;
  name: string;
  username: string;
  startDate: string;
  profilePic: string;
  birthday: string;
  email: string;
  posts: PostType[];
  searchterms: string[];
};

export type ShortProfileType = {
  username: string;
  profilePic: string;
  name: string;
};

export type PostType = {
  username: string;
  postType: string;
  postContent: string;
  postDate: string;
  postLikes: number;
  postComments: {[key: string]: string}[];
  image?: any;
  challenger?: string;
  private: boolean;
};

export type HabitType = {
  name: string;
  description: string;
  streak: number;
  progress: {[key: string]: boolean};
  habitId: string;
  habitTags: string[];
  private: boolean;
};

export type HabitDataType = {
  name: string;
  desc: string;
  tags: string[];
};

export type RootStackParamList = {
  Home: undefined;
  Habits: {search: string};
};
