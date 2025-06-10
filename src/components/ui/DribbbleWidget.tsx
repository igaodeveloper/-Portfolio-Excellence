import React, { useEffect, useState } from 'react';
import { fetchDribbbleShots } from '../../services/dribbbleService';

interface Shot {
  id: number;
  title: string;
  image: string;
  url: string;
}

const DribbbleWidget = ({ username }: { username: string }) => {
  const [shots, setShots] = useState<Shot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDribbbleShots(username).then((data) => {
      setShots(data);
      setLoading(false);
    });
  }, [username]);

  if (loading) return <div>Carregando Dribbble...</div>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {shots.map((shot) => (
        <a
          key={shot.id}
          href={shot.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
        >
          <img src={shot.image} alt={shot.title} className="w-full h-32 object-cover" />
          <div className="p-2 text-sm font-medium text-center bg-background">{shot.title}</div>
        </a>
      ))}
    </div>
  );
};

export default DribbbleWidget; 