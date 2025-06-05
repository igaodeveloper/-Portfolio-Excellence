import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Badge } from '../ui/badge';

interface BlogCardProps {
  post: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    date: string;
    readTime: number;
    categories: string[];
    tags?: string[];
    author?: {
      name: string;
      avatar: string;
    };
  };
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-2xl overflow-hidden shadow-xl transition-transform bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-400 group ${featured ? 'h-full' : ''}`}
      style={{
        background: featured
          ? 'linear-gradient(135deg, rgba(32,201,151,0.12) 0%, rgba(66,153,225,0.12) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(236,239,241,0.7) 100%)',
      }}
    >
      <Link to={`/blog/${post.slug}`} className="block h-full focus:outline-none focus:ring-2 focus:ring-blue-400">
        <div className="relative">
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className={
              featured ? 'w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105' : 'w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
            }
          />
          {post.author && (
            <div className="absolute z-10 flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-full shadow-md -bottom-6 left-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur dark:border-gray-800">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="object-cover w-8 h-8 border-2 border-blue-400 rounded-full"
              />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{post.author.name}</span>
            </div>
          )}
        </div>
        <div className="p-6 pt-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category, index) => (
              <Badge key={index} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <h3 className="mb-2 text-2xl font-extrabold leading-tight text-gray-800 transition-colors dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {post.title}
          </h3>
          <p className="mb-4 text-lg text-gray-600 dark:text-gray-400 line-clamp-2">
            {post.excerpt}
          </p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-xs text-blue-700 dark:text-blue-200 font-medium">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-6 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                {format(new Date(post.date), 'dd MMM, yyyy', { locale: pt })}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{post.readTime} min de leitura</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
