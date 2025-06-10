import React, { useEffect, useState } from 'react';
import { fetchBehanceProjects } from '../../services/behanceService';

interface Project {
  id: number;
  title: string;
  image: string;
  url: string;
}

const BehanceWidget = ({ username }: { username: string }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBehanceProjects(username).then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, [username]);

  if (loading) return <div>Carregando Behance...</div>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {projects.map((project) => (
        <a
          key={project.id}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
        >
          <img src={project.image} alt={project.title} className="w-full h-32 object-cover" />
          <div className="p-2 text-sm font-medium text-center bg-background">{project.title}</div>
        </a>
      ))}
    </div>
  );
};

export default BehanceWidget; 