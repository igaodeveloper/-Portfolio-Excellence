export async function fetchMediumPosts(username: string, limit = 5) {
  const cacheKey = `medium_posts_${username}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {}
  }
  // Medium não tem API pública, mas é possível usar RSS
  const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`);
  const data = await response.json();
  const posts = data.items.slice(0, limit).map((item: any) => ({
    id: item.guid,
    title: item.title,
    link: item.link,
    thumbnail: item.thumbnail,
    pubDate: item.pubDate,
  }));
  sessionStorage.setItem(cacheKey, JSON.stringify(posts));
  return posts;
} 