'use client';

import { useState, useRef } from 'react';
import { Image, Send } from 'lucide-react';
import { Post } from '@/lib/types';
import { savePost } from '@/lib/storage';

interface ComposerProps {
  onNewPost: (post: Post) => void;
}

export default function Composer({ onNewPost }: ComposerProps) {
  const [text, setText] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (1MB limit)
    if (file.size > 1024 * 1024) {
      setImageError('حجم الصورة كبير جداً (الحد الأقصى 1 ميجابايت)');
      return;
    }

    setImageError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageDataUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const post: Post = {
      id: crypto.randomUUID(),
      text: text.trim(),
      imageDataUrl: imageDataUrl || undefined,
      createdAt: new Date().toISOString()
    };

    savePost(post);
    onNewPost(post);
    
    // Reset form
    setText('');
    setImageDataUrl('');
    setImageError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = () => {
    setImageDataUrl('');
    setImageError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-12">
      <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="بِمَ تفكرين الآن؟"
          className="w-full h-32 bg-transparent resize-none text-right prose-arabic text-lg placeholder:text-slate-500 focus:outline-none"
        />
        
        {imageDataUrl && (
          <div className="relative mt-4">
            <img
              src={imageDataUrl}
              alt="معاينة الصورة"
              className="max-w-full h-48 object-cover rounded-xl"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 left-2 p-1 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        )}
        
        {imageError && (
          <div className="mt-2 text-red-400 text-sm prose-arabic">
            {imageError}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700">
          <div className="flex gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all cursor-pointer"
              title="إضافة صورة"
            >
              <Image className="w-5 h-5" />
            </label>
          </div>
          
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-xl text-purple-200 hover:bg-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <Send className="w-4 h-4" />
            <span className="prose-arabic">نشر</span>
          </button>
        </div>
      </div>
    </form>
  );
}