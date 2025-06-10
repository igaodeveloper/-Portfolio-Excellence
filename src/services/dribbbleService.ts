export async function fetchDribbbleShots(username: string, perPage = 6) {
  const cacheKey = `dribbble_shots_${username}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {}
  }
  // Dribbble API pública exige autenticação para dados reais. Exemplo fictício:
  // const response = await fetch(`https://api.dribbble.com/v2/user/${username}/shots?access_token=YOUR_TOKEN&per_page=${perPage}`);
  // return response.json();

  // Exemplo mock para demonstração:
  const shots = [
    {
      id: 1,
      title: 'UI Concept 1',
      image: 'https://cdn.dribbble.com/users/123/screenshots/1234567/ui1.png',
      url: 'https://dribbble.com/shots/1234567-UI-Concept-1',
    },
    {
      id: 2,
      title: 'UI Concept 2',
      image: 'https://cdn.dribbble.com/users/123/screenshots/1234568/ui2.png',
      url: 'https://dribbble.com/shots/1234568-UI-Concept-2',
    },
  ];
  sessionStorage.setItem(cacheKey, JSON.stringify(shots));
  return shots;
} 