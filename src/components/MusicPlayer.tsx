import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward, FaSpotify, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { searchSpotifyTracks } from '../services/spotifyService';

const PLAYLIST = [
  {
    url: '/assets/Chris Brown - Residuals (Lyrics).mp3',
    title: 'Residuals',
    artist: 'Chris Brown',
  },
  {
    url: '/assets/Drake - Laugh Now Cry Later (Official Music Video) ft. Lil Durk.mp3',
    title: 'Laugh Now Cry Later',
    artist: 'Drake ft. Lil Durk',
  },
  {
    url: '/assets/Melhor Vibe - MC Ryan SP, Filipe Ret, Chefin e Caio Luccas.mp3',
    title: 'Melhor Vibe',
    artist: 'MC Ryan SP, Filipe Ret, Chefin, Caio Luccas',
  },
  {
    url: '/assets/Olha oq ce fez comigo (1).mp3',
    title: 'Olha oq ce fez comigo',
    artist: 'Desconhecido',
  },
];

const MusicPlayer: React.FC = () => {
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hover, setHover] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [current, setCurrent] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [spotifyResults, setSpotifyResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const currentTrack = PLAYLIST[current];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? PLAYLIST.length - 1 : prev - 1));
    setPlayed(0);
    setPlaying(true);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === PLAYLIST.length - 1 ? 0 : prev + 1));
    setPlayed(0);
    setPlaying(true);
  };

  const handleSpotifySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setSearching(true);
    setSpotifyResults([]);
    try {
      const results = await searchSpotifyTracks(searchTerm);
      setSpotifyResults(results);
    } catch (err) {
      alert('Erro ao buscar no Spotify');
    } finally {
      setSearching(false);
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-[100] shadow-2xl"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: hover && !minimized ? 1.03 : 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backdropFilter: 'blur(20px)',
        background: 'linear-gradient(120deg, #18181b 60%, #1db95422 100%)',
        borderRadius: minimized ? '50%' : '2rem',
        border: hover && !minimized ? '2.5px solid #1db954' : '1.5px solid #232323',
        boxShadow: hover && !minimized
          ? '0 12px 40px 0 #1db95444, 0 2px 8px 0 #1db95422'
          : '0 8px 32px 0 #23232333',
        minWidth: minimized ? 64 : 340,
        maxWidth: minimized ? 64 : 420,
        width: minimized ? 64 : undefined,
        height: minimized ? 64 : undefined,
        padding: minimized ? 0 : 22,
        display: 'flex',
        alignItems: 'center',
        gap: minimized ? 0 : 18,
        justifyContent: minimized ? 'center' : 'flex-start',
        transition: 'all 0.35s cubic-bezier(.4,2,.6,1)',
        overflow: 'hidden',
        cursor: 'default', // Permite o ponteiro ser visto normalmente
        pointerEvents: 'auto', // Garante que o mouse interaja normalmente
      }}
    >
      {/* Busca Spotify */}
      <form onSubmit={handleSpotifySearch} style={{ display: minimized ? 'none' : 'flex', alignItems: 'center', gap: 8, marginBottom: 12, width: '100%' }}>
        <input
          type="text"
          placeholder="Buscar música no Spotify..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            borderRadius: 8,
            border: '1px solid #1db954',
            padding: '6px 12px',
            outline: 'none',
            minWidth: 180,
            fontSize: 15,
            background: '#232323',
            color: '#fff',
          }}
        />
        <button type="submit" style={{ background: '#1db954', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer' }}>
          <FaSpotify color="#fff" size={18} />
        </button>
        {searching && <span style={{ color: '#1db954', fontSize: 12 }}>Buscando...</span>}
      </form>
      {/* Resultados Spotify */}
      {spotifyResults.length > 0 && !minimized && (
        <div style={{
          background: '#18181b',
          borderRadius: 12,
          padding: 12,
          marginBottom: 16,
          maxHeight: 220,
          overflowY: 'auto',
          width: '100%',
        }}>
          <div style={{ fontWeight: 600, color: '#1db954', marginBottom: 6 }}>Resultados do Spotify</div>
          {spotifyResults.map(track => (
            <div key={track.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              {track.image && <img src={track.image} alt={track.title} style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'cover' }} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, color: '#fff', fontSize: 15 }}>{track.title}</div>
                <div style={{ color: '#6ee7ef', fontSize: 13 }}>{track.artist} <span style={{ color: '#aaa', fontSize: 12 }}>({track.album})</span></div>
              </div>
              {track.preview && (
                <audio controls src={track.preview} style={{ height: 24 }}>
                  Seu navegador não suporta áudio.
                </audio>
              )}
              <a href={track.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1db954', marginLeft: 8 }} title="Ouvir no Spotify">
                <FaSpotify size={18} />
              </a>
            </div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {minimized && (
          <motion.button
            key="minimized"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setMinimized(false)}
            aria-label="Restaurar player"
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1db95422 60%, #232323 100%)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px 0 #1db95422',
              cursor: 'pointer', // Ponteiro visível no modo minimizado
              position: 'relative',
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.08, boxShadow: '0 0 0 4px #1db95444' }}
          >
            <FaChevronUp size={16} color="#1db954" style={{ position: 'absolute', bottom: 8, right: 8, opacity: 0.7 }} />
            <FaSpotify size={28} color="#1db954" />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {minimized ? (
          <motion.button
            key="minimized"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setMinimized(false)}
            aria-label="Restaurar player"
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1db95422 60%, #232323 100%)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px 0 #1db95422',
              cursor: 'pointer',
              position: 'relative',
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.08, boxShadow: '0 0 0 4px #1db95444' }}
          >
            <FaChevronUp size={16} color="#1db954" style={{ position: 'absolute', bottom: 8, right: 8, opacity: 0.7 }} />
            <FaSpotify size={28} color="#1db954" />
          </motion.button>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              style={{
                width: 54,
                height: 54,
                borderRadius: '1rem',
                background: 'linear-gradient(135deg, #1db95422 60%, #232323 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px 0 #1db95422',
                position: 'relative',
                overflow: 'visible',
              }}
            >
              <FaSpotify size={32} color="#1db954" />
            </motion.div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <motion.div
                className="text-base font-semibold truncate"
                style={{ color: '#fff' }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {currentTrack.title}
              </motion.div>
              <motion.div
                className="mb-1 text-xs truncate"
                style={{ color: '#1db954' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {currentTrack.artist}
              </motion.div>
              <div className="flex items-center gap-2">
                <motion.button
                  aria-label="Anterior"
                  onClick={handlePrev}
                  className="focus:outline-none"
                  style={{
                    background: '#232323',
                    border: 'none',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.13, backgroundColor: '#1db95422' }}
                >
                  <FaStepBackward size={14} color="#1db954" />
                </motion.button>
                <motion.button
                  aria-label={playing ? 'Pausar' : 'Tocar'}
                  onClick={() => setPlaying((p) => !p)}
                  className="focus:outline-none"
                  style={{
                    background: '#1db954',
                    border: 'none',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: playing ? '0 0 0 2px #1db954' : undefined,
                    transition: 'box-shadow 0.2s',
                  }}
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.13, backgroundColor: '#232323' }}
                >
                  {playing ? <FaPause size={18} color="#fff" /> : <FaPlay size={18} color="#fff" />}
                </motion.button>
                <motion.button
                  aria-label="Próxima"
                  onClick={handleNext}
                  className="focus:outline-none"
                  style={{
                    background: '#232323',
                    border: 'none',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.13, backgroundColor: '#1db95422' }}
                >
                  <FaStepForward size={14} color="#1db954" />
                </motion.button>
                <motion.div
                  style={{ flex: 1, position: 'relative', height: 8, display: 'flex', alignItems: 'center' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <motion.input
                    type="range"
                    min={0}
                    max={0.999999}
                    step="any"
                    value={played}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setPlayed(val);
                      playerRef.current?.seekTo(val);
                    }}
                    style={{ flex: 1, accentColor: '#1db954', height: 4, background: 'transparent', zIndex: 2 }}
                    aria-label="Progresso da música"
                    whileFocus={{ scale: 1.05 }}
                  />
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      width: `${played * 100}%`,
                      height: 4,
                      background: 'linear-gradient(90deg, #1db954 60%, #232323 100%)',
                      borderRadius: 4,
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                      pointerEvents: 'none',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${played * 100}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </motion.div>
                <motion.div
                  className="text-xs"
                  style={{ color: '#fff', minWidth: 38, textAlign: 'right' }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                >
                  {formatTime(played * duration)}
                </motion.div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <motion.button
                  aria-label={muted ? 'Ativar som' : 'Mutar'}
                  onClick={() => setMuted((m) => !m)}
                  className="focus:outline-none"
                  style={{ background: 'none', border: 'none', padding: 0 }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.13, backgroundColor: '#1db95422' }}
                >
                  {muted || volume === 0 ? (
                    <FaVolumeMute size={16} color="#1db954" />
                  ) : (
                    <FaVolumeUp size={16} color="#1db954" />
                  )}
                </motion.button>
                <motion.input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setVolume(v);
                    setMuted(v === 0);
                  }}
                  style={{ width: 60, accentColor: '#1db954', height: 4 }}
                  aria-label="Volume"
                  whileFocus={{ scale: 1.05 }}
                />
                <motion.button
                  aria-label="Minimizar player"
                  onClick={() => setMinimized(true)}
                  className="focus:outline-none ml-auto"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer', // Garante ponteiro visível no botão
                  }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.13, backgroundColor: '#1db95422' }}
                >
                  <FaChevronDown size={16} color="#1db954" />
                </motion.button>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
      <ReactPlayer
        ref={playerRef}
        url={currentTrack.url}
        playing={playing}
        volume={volume}
        muted={muted}
        width={0}
        height={0}
        style={{ display: 'none' }}
        onProgress={({ played }) => setPlayed(played)}
        onDuration={setDuration}
        onEnded={handleNext}
      />
    </motion.div>
  );
};

export default MusicPlayer;