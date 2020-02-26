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
  content: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  likedBy?: User[] | [];
  comments?: Comment[] | [];
}

export interface Notification {
  id: number;
  actionType: string;
  forUser: User;
  topic?: Topic;
  story?: Story;
  fromUser?: User;
  createdAt?: number;
  updatedAt?: number;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  story: Story;
  parentCommentId?: Comment;
  subComments?: Comment[];
}