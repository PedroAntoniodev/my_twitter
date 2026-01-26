export interface Post {
  id: number;
  user: string;
  content: string;
  createdAt: Date;
  likes: number;
  likedByMe?: boolean;
  comments: Comment[];
}

export interface Comment {
  id: number;
  user: string;
  text: string;
  createdAt: Date;
}
