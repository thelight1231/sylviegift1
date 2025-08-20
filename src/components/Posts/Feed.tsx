'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Post } from '../../lib/types';
import { deletePost } from '../../lib/storage';

interface FeedProps {
  posts: Post[];
  onDeletePost: (id: string) => void;
}

export default function Feed({ posts, onDeletePost }: FeedProps) {
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'منذ لحظات';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    return `منذ ${diffDays} يوم`;
  };

  const toggleExpanded = (postId: string) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل تريدين حذف هذا المنشور؟')) {
      deletePost(id);
      onDeletePost(id);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="prose-arabic text-slate-400 text-lg">
          لم تكتبي شيئاً بعد... ابدئي رحلتك
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => {
        const isExpanded = expandedPosts.has(post.id);
        const isLongText = post.text.length > 200;
        const displayText = isLongText && !isExpanded 
          ? post.text.slice(0, 200) + '...' 
          : post.text;

        return (
          <article
            key={post.id}
            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 glow-hover transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <time className="text-sm text-slate-400 prose-arabic">
                {formatRelativeTime(post.createdAt)}
              </time>
              <button
                onClick={() => handleDelete(post.id)}
                className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                title="حذف المنشور"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            {post.imageDataUrl && (
              <div className="mb-4">
                <img
                  src={post.imageDataUrl}
                  alt="صورة المنشور"
                  className="w-full max-h-96 object-cover rounded-xl"
                />
              </div>
            )}
            
            <div className="prose-arabic text-base md:text-lg text-slate-200 leading-relaxed mb-3 whitespace-pre-wrap text-right">
              {displayText}
            </div>
            
            {isLongText && (
              <button
                onClick={() => toggleExpanded(post.id)}
                className="text-purple-400 hover:text-purple-300 text-sm prose-arabic transition-colors"
              >
                {isExpanded ? 'اقرأ أقل' : 'اقرأ المزيد'}
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
}