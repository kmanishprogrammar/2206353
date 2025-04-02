import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
});

export interface User {
  id: string;
  name: string;
  postCount: number;
}

export interface Post {
  id: number;
  userId: number;
  content: string;
  commentCount: number;
  timestamp: number;
  userName?: string;
}

export const fetchTopUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<{ users: User[] }>('/users');
  return response.data.users;
};

export const fetchLatestPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<{ posts: Post[] }>('/posts?type=latest');
  return response.data.posts;
};

export const fetchPopularPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<{ posts: Post[] }>('/posts?type=popular');
  return response.data.posts;
};