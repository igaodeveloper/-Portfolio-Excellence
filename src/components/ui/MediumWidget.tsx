import React, { useEffect, useState } from 'react';
import { fetchMediumPosts } from '../../services/mediumService';

interface Post {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  pubDate: string;
}

const MediumWidget = ({ username }: { username: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMediumPosts(username).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, [username]);

  if (loading) return <div>Carregando Medium...</div>;

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-2 rounded-lg bg-background shadow hover:scale-105 transition-transform"
        >
          <img src={post.thumbnail} alt={post.title} className="w-16 h-16 object-cover rounded" />
          <div>
            <div className="font-semibold text-modern-accent">{post.title}</div>
            <div className="text-xs text-modern-gray">{new Date(post.pubDate).toLocaleDateString()}</div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default MediumWidget; 