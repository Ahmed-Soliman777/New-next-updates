export interface post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

export interface ErrorProps {
  error: Error;
  reset: () => void;
}

export interface PostDetailsProps {
  params: { id: string };
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface CreatePostDTO {
  title: string;
  body: string;
}

export interface UpdatePostDTO {
  title?: string;
  body?: string;
}

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface JWTPayload {
  id: number;
  isAdmin: boolean;
  userName: string;
}

export interface ProfileIdProps {
  params: { id: string };
}

export interface UpdateProfileDTO {
  username?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
}

export interface CreateCommentDTO {
  text: string;
  postId: number;
}

export interface commentPropsType {
  params: { id: string };
}

export interface UpdateCommentDTO {
  text: string;
}
