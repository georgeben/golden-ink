export interface Topic {
  id: number;
  name: string;
  imageUrl: string;
  slug: string;
  followerCount: number;
}

interface EmailNotification {
  daily: boolean;
  weekly: boolean;
  reactions: boolean;
}
export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  slug: string;
  headline?: string;
  bio?: string;
  profilePhotoUrl: string;
  topics?: Topic[];
  likes?: Story[];
  bookmarks?: Story[];
  emailNotificationSettings?: EmailNotification;
  createdAt: number;
  updatedAt: number;
}

interface Comment{
  id: number;
  content: string;
  user: User;
  story: Story;
  parentComment?: Comment | null;
  createdAt: number;
  updatedAt: number;

}
export interface Story {
  id: number;
  author: User;
  topic: Topic;
  draft: boolean;
  private: boolean;
  slug: string;
  imageUrl?: string;
  content: string;
  formattedContent: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  likedBy?: User[];
  comments?: Comment[] | [];
}

export interface Notification {
  id: number;
  actionType: string;
  forUser: User;
  topic?: Topic;
  story: Story;
  comment: Comment;
  fromUser: User;
  read: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  story: Story;
  likedBy: User[];
  // parentCommentId?: Comment;
  // subComments?: Comment[];
}

export interface NewStory{
  title: string;
  content: string;
  formattedContent: string;
  topicSlug: string;
  imageUrl?: string;
  draft?: boolean;
  private?: boolean;
}

export interface SearchResults {
  users: User[];
  topics: Topic[];
  stories: Story[];
}