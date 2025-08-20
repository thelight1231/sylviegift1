'use client';

import { useState } from 'react';
import Composer from './Composer';
import Feed from './Feed';
import { Post } from '@/lib/types';
import { getPosts, clearAllPosts } from '@/lib/storage';

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>(getPosts());

  const handleNewPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
  };

  const handleDeletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('هل أنتِ متأكدة من حذف جميع المنشورات؟')) {
      clearAllPosts();
      setPosts([]);
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-arabic text-3xl md:text-4xl mb-4 text-slate-200">
            دفترك السرّي
          </h2>
          <p className="prose-arabic text-slate-400">
            مكان آمن لأفكارك الخاصة
          </p>
        </div>
        
        <Composer onNewPost={handleNewPost} />
        
        {posts.length > 0 && (
          <div className="text-center mb-8">
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-sm text-red-400 hover:text-red-300 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-all"
            >
              حذف جميع المنشورات
            </button>
          </div>
        )}
        
        <Feed posts={posts} onDeletePost={handleDeletePost} />
      </div>
    </section>
  );
}