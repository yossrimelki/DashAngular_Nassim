export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  profile_image?: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdateResponse {
  message: string;
  user: User;
}

export interface UsersResponse {
  role: string;
  count: number;
  users: User[];
}