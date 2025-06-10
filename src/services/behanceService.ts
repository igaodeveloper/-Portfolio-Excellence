export async function fetchBehanceProjects(username: string, perPage = 6) {
  const cacheKey = `behance_projects_${username}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {}
  }
  // Behance API pública exige autenticação para dados reais. Exemplo fictício:
  // const response = await fetch(`https://api.behance.net/v2/users/${username}/projects?api_key=YOUR_KEY&page=1&per_page=${perPage}`);
  // return response.json();

  // Exemplo mock para demonstração:
  const projects = [
    {
      id: 1,
      title: 'Projeto Behance 1',
      image: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/1234567890abcdef.jpg',
      url: 'https://behance.net/gallery/1234567890/Projeto-1',
    },
    {
      id: 2,
      title: 'Projeto Behance 2',
      image: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/abcdef1234567890.jpg',
      url: 'https://behance.net/gallery/abcdef1234567890/Projeto-2',
    },
  ];
  sessionStorage.setItem(cacheKey, JSON.stringify(projects));
  return projects;
} 