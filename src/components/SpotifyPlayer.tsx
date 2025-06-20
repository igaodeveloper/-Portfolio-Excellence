import React, { useState, useRef } from 'react';
import { FaSpotify, FaSearch, FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { searchSpotifyTracks } from '../services/spotifyService';

const SpotifyPlayer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    setResults([]);
    setSelected(null);
    try {
      const tracks = await searchSpotifyTracks(searchTerm);
      setResults(tracks);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (track: any) => {
    setSelected(track);
    setPlaying(false);
    setTimeout(() => setPlaying(true), 100);
  };

  const handlePlayPause = () => {
    if (!selected) return;
    setPlaying((p) => !p);
    if (audioRef.current) {
      if (playing) audioRef.current.pause();
      else audioRef.current.play();
    }
  };

  const handlePrev = () => {
    if (!selected || results.length === 0) return;
    const idx = results.findIndex((t) => t.id === selected.id);
    if (idx > 0) handleSelect(results[idx - 1]);
  };

  const handleNext = () => {
    if (!selected || results.length === 0) return;
    const idx = results.findIndex((t) => t.id === selected.id);
    if (idx < results.length - 1) handleSelect(results[idx + 1]);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setMuted(v === 0);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div style={{
      background: '#18181b',
      borderRadius: 16,
      boxShadow: '0 4px 16px 0 #23232333',
      padding: 12,
      maxWidth: 320,
      margin: '24px auto',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      width: 290,
      minHeight: 320,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      position: 'relative',
    }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 6 }}>
        <input
          type="text"
          placeholder="Buscar música ou artista..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            borderRadius: 6,
            border: '1.5px solid #1db954',
            padding: '7px 10px',
            fontSize: 13,
            background: '#232323',
            color: '#fff',
            outline: 'none',
            minWidth: 0,
          }}
        />
        <button type="submit" style={{ background: '#1db954', border: 'none', borderRadius: 6, padding: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaSearch color="#fff" size={14} />
        </button>
      </form>
      {loading && <div style={{ color: '#1db954', fontSize: 13 }}>Buscando...</div>}
      {results.length > 0 && (
        <div style={{ maxHeight: 90, overflowY: 'auto', marginBottom: 4 }}>
          {results.map(track => (
            <div
              key={track.id}
              onClick={() => handleSelect(track)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: 5,
                borderRadius: 6,
                background: selected?.id === track.id ? '#1db95422' : 'transparent',
                cursor: 'pointer',
                marginBottom: 2,
                border: selected?.id === track.id ? '1.5px solid #1db954' : '1.5px solid transparent',
                transition: 'background 0.2s, border 0.2s',
              }}
            >
              {track.image && <img src={track.image} alt={track.title} style={{ width: 28, height: 28, borderRadius: 6, objectFit: 'cover' }} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 12 }}>{track.title}</div>
                <div style={{ color: '#6ee7ef', fontSize: 11 }}>{track.artist}</div>
              </div>
              <a href={track.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1db954', marginLeft: 4 }} title="Ouvir no Spotify">
                <FaSpotify size={14} />
              </a>
            </div>
          ))}
        </div>
      )}
      <div style={{ background: '#232323', borderRadius: 10, padding: 10, minHeight: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {selected ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
              <img src={selected.image} alt={selected.title} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', marginRight: 6 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selected.title}</div>
                <div style={{ color: '#1db954', fontSize: 12, marginBottom: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selected.artist}</div>
                <div style={{ color: '#aaa', fontSize: 11, marginBottom: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selected.album}</div>
              </div>
              <a href={selected.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1db954', marginLeft: 4 }} title="Ouvir no Spotify">
                <FaSpotify size={18} />
              </a>
            </div>
            <audio
              ref={audioRef}
              src={selected.preview}
              style={{ width: '100%', margin: '4px 0', display: 'none' }}
              autoPlay={playing}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              muted={muted}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'center', marginTop: 6 }}>
              <button onClick={handlePrev} style={{ background: 'none', border: 'none', color: '#1db954', fontSize: 18, cursor: 'pointer', padding: 4 }} title="Anterior">
                <FaStepBackward />
              </button>
              <button onClick={handlePlayPause} style={{ background: '#1db954', border: 'none', color: '#fff', borderRadius: 6, padding: '6px 12px', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                {playing ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={handleNext} style={{ background: 'none', border: 'none', color: '#1db954', fontSize: 18, cursor: 'pointer', padding: 4 }} title="Próxima">
                <FaStepForward />
              </button>
              <button onClick={() => { setMuted((m) => !m); if (audioRef.current) audioRef.current.muted = !muted; }} style={{ background: 'none', border: 'none', color: '#1db954', fontSize: 16, cursor: 'pointer', padding: 4 }} title={muted ? 'Ativar som' : 'Mutar'}>
                {muted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolume}
                style={{ width: 60, accentColor: '#1db954', height: 3 }}
                aria-label="Volume"
              />
              <a href={selected.url} target="_blank" rel="noopener noreferrer" style={{ background: '#1db954', color: '#fff', borderRadius: 6, padding: '5px 10px', fontWeight: 600, fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}>
                <FaSpotify />
              </a>
            </div>
          </>
        ) : (
          <div style={{ color: '#aaa', fontSize: 13, textAlign: 'center' }}>Selecione uma música para ouvir a prévia.</div>
        )}
      </div>
    </div>
  );
};

export default SpotifyPlayer;
