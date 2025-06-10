import React, { useEffect, useState } from 'react';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
}

const GitHubStatusWidget = ({ username }: { username: string }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      });
  }, [username]);

  if (loading) return <div>Carregando GitHub...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold mb-2">Repositórios em Destaque</h3>
      <ul className="space-y-2">
        {repos.map((repo) => (
          <li key={repo.id} className="p-3 rounded-lg bg-background shadow border border-border">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-modern-accent hover:underline">
              {repo.name}
            </a>
            <p className="text-sm text-modern-gray mt-1">{repo.description}</p>
            <span className="text-xs text-yellow-500">★ {repo.stargazers_count}</span>
          </li>
        ))}
      </ul>
      {/* Widget de contribuições pode ser adicionado via imagem do GitHub */}
      <div className="mt-4">
        <h4 className="font-semibold mb-1">Contribuições Recentes</h4>
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt="GitHub Contributions"
          className="w-full max-w-xs mx-auto border rounded"
        />
      </div>
    </div>
  );
};

export default GitHubStatusWidget; 