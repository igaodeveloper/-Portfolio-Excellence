import React, { useState } from 'react';
import { FaSpotify, FaSearch, FaPlay, FaPause } from 'react-icons/fa';
import { searchSpotifyTracks } from '../services/spotifyService';

const SpotifyMusicPlayer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<any | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    setResults([]);
    setSelectedTrack(null);
    try {
      const tracks = await searchSpotifyTracks(searchTerm);
      setResults(tracks);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (track: any) => {
    setSelectedTrack(track);
    setPlaying(false);
    setTimeout(() => setPlaying(true), 100); // Garante autoplay
  };

  return (
    <div style={{
      background: '#18181b',
      borderRadius: 16, // Menor
      boxShadow: '0 4px 16px 0 #23232333',
      padding: 14,
      maxWidth: 320,
      margin: '24px auto',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      width: 270, // Menor
      minHeight: 0,
      aspectRatio: '1/1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      position: 'relative',
      zIndex: 10,
    }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Buscar música ou artista..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            borderRadius: 6,
            border: '1px solid #1db954',
            padding: '7px 10px',
            fontSize: 13,
            background: '#232323',
            color: '#fff',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            background: '#1db954',
            border: 'none',
            borderRadius: 6,
            padding: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            position: 'relative',
          }}
        >
          <FaSearch color="#fff" size={14} />
        </button>
      </form>
      {loading && <div style={{ color: '#1db954', marginBottom: 8, fontSize: 13 }}>Buscando...</div>}
      {results.length > 0 && (
        <div style={{ maxHeight: 120, overflowY: 'auto', marginBottom: 10 }}>
          {results.map(track => (
            <div
              key={track.id}
              onClick={() => handleSelect(track)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: 6,
                borderRadius: 7,
                background: selectedTrack?.id === track.id ? '#1db95422' : 'transparent',
                cursor: 'pointer',
                marginBottom: 3,
                border: selectedTrack?.id === track.id ? '1px solid #1db954' : '1px solid transparent',
                transition: 'background 0.2s, border 0.2s',
              }}
            >
              {track.image && <img src={track.image} alt={track.title} style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</div>
                <div style={{ color: '#6ee7ef', fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.artist}</div>
              </div>
              <a href={track.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1db954', marginLeft: 4 }} title="Ouvir no Spotify">
                <FaSpotify size={16} />
              </a>
            </div>
          ))}
        </div>
      )}
      {selectedTrack && (
        <div style={{
          background: '#232323',
          borderRadius: 12,
          padding: 10,
          marginTop: 6,
          textAlign: 'center',
        }}>
          <img src={selectedTrack.image} alt={selectedTrack.title} style={{ width: 54, height: 54, borderRadius: 8, objectFit: 'cover', marginBottom: 6 }} />
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedTrack.title}</div>
          <div style={{ color: '#1db954', fontSize: 13, marginBottom: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedTrack.artist}</div>
          <div style={{ color: '#aaa', fontSize: 11, marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedTrack.album}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
            {selectedTrack.preview ? (
              <audio
                src={selectedTrack.preview}
                controls
                autoPlay={playing}
                style={{ width: 90, height: 24 }}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
            ) : (
              <div style={{ color: '#aaa', fontSize: 11 }}>Prévia não disponível</div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 2 }}>
            <button
              onClick={() => setPlaying(p => !p)}
              style={{
                background: playing ? '#1db954' : '#232323',
                color: playing ? '#fff' : '#1db954',
                border: '1px solid #1db954',
                borderRadius: 6,
                padding: '5px 12px',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
                zIndex: 20,
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {playing ? <FaPause /> : <FaPlay />}
              {playing ? 'Pausar' : 'Tocar'}
            </button>
            <a
              href={selectedTrack.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#1db954',
                color: '#fff',
                borderRadius: 6,
                padding: '5px 12px',
                fontWeight: 600,
                fontSize: 13,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                zIndex: 20,
                position: 'relative',
              }}
            >
              Spotify <FaSpotify style={{ marginLeft: 2, marginBottom: -1 }} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyMusicPlayer;
