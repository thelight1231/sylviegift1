import { Post } from './types';

const STORAGE_KEY = 'vs_posts';

export function getPosts(): Post[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading posts from localStorage:', error);
    return [];
  }
}

export function savePost(post: Post): void {
  if (typeof window === 'undefined') return;
  
  try {
    const posts = getPosts();
    const updatedPosts = [post, ...posts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  } catch (error) {
    console.error('Error saving post to localStorage:', error);
  }
}

export function deletePost(id: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const posts = getPosts();
    const updatedPosts = posts.filter(post => post.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  } catch (error) {
    console.error('Error deleting post from localStorage:', error);
  }
}

export function clearAllPosts(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing posts from localStorage:', error);
  }
}