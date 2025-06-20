// src/services/spotifyService.ts
// Serviço para buscar músicas do Spotify via API pública
// Necessário obter um client_id e client_secret em https://developer.spotify.com/dashboard

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || '';

let accessToken: string | null = null;
let tokenExpires = 0;

async function getSpotifyToken() {
  if (accessToken && Date.now() < tokenExpires) return accessToken;
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
    },
    body: 'grant_type=client_credentials',
  });
  const data = await res.json();
  accessToken = data.access_token;
  tokenExpires = Date.now() + data.expires_in * 1000 - 60000;
  return accessToken;
}

export async function searchSpotifyTracks(query: string) {
  const token = await getSpotifyToken();
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await res.json();
  return (
    data.tracks?.items?.map((item: any) => ({
      id: item.id,
      title: item.name,
      artist: item.artists.map((a: any) => a.name).join(', '),
      album: item.album.name,
      url: item.external_urls.spotify,
      preview: item.preview_url,
      image: item.album.images[0]?.url,
    })) || []
  );
}

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'undefined';

export async function fetchWebApi(endpoint: string, method: string, body?: any) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
  });
  return await res.json();
}

export async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

// Exemplo de uso (async context):
// const topTracks = await getTopTracks();
// console.log(
//   topTracks?.map(
//     ({name, artists}) =>
//       `${name} by ${artists.map(artist => artist.name).join(', ')}`
//   )
// );
