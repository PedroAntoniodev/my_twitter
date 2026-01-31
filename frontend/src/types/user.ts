export interface User {
  id: number;
  display_name?: string;
  username: string;
  bio: string | null;
  avatar: string | null;
  email?: string;
}
