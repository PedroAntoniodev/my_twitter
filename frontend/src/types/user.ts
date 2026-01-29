export interface User {
  id: number;
  display_name: string;
  bio: string | null;
  avatar: string | null;
  email?: string;
}
