import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
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
  };
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform relative hover:shadow-xl ${
        featured ? 'h-full' : ''
      }`}
    >
      <Link to={`/blog/${post.slug}`} className="block h-full">
        <img
          src={post.coverImage}
          alt={post.title}
          className={
            featured ? 'w-full h-56 object-cover' : 'w-full h-48 object-cover'
          }
        />
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category, index) => (
              <Badge key={index} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center mr-4">
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
