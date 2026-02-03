export interface Post {
  id: number;
  author: string;
  content: string;
  created_at: string;
  updated_at: string;
  liked_by_me?: boolean;
  total_likes: number;
  total_comments: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  created_at: string;
}
