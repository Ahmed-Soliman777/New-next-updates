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