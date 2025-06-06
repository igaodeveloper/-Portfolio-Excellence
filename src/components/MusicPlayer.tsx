import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaMusic, FaChevronDown, FaChevronUp, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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

  const currentTrack = PLAYLIST[current];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
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

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-[100] shadow-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backdropFilter: 'blur(16px)',
        background:
          'linear-gradient(120deg, rgba(255,255,255,0.18) 60%, rgba(0,210,223,0.12) 100%)',
        borderRadius: minimized ? '50%' : '1.5rem',
        border: '1.5px solid rgba(255,255,255,0.25)',
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
        minWidth: minimized ? 64 : 280,
        maxWidth: minimized ? 64 : 340,
        width: minimized ? 64 : undefined,
        height: minimized ? 64 : undefined,
        padding: minimized ? 0 : 18,
        display: 'flex',
        alignItems: 'center',
        gap: minimized ? 0 : 16,
        justifyContent: minimized ? 'center' : 'flex-start',
        transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
        overflow: 'hidden',
      }}
    >
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
              background:
                'linear-gradient(135deg, rgba(0,210,223,0.18) 60%, rgba(255,255,255,0.10) 100%)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px 0 rgba(0,210,223,0.10)',
              cursor: 'pointer',
              position: 'relative',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: playing ? 360 : 0 }}
              transition={{ repeat: playing ? Infinity : 0, duration: 2, ease: 'linear' }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <FaMusic size={28} color="#00d2df" />
            </motion.div>
            <FaChevronUp
              size={16}
              color="#00d2df"
              style={{ position: 'absolute', bottom: 8, right: 8, opacity: 0.7 }}
            />
          </motion.button>
        ) : (
          <>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: '1rem',
                background:
                  'linear-gradient(135deg, rgba(0,210,223,0.18) 60%, rgba(255,255,255,0.10) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px 0 rgba(0,210,223,0.10)',
              }}
            >
              <FaMusic size={28} color="#00d2df" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="text-base font-semibold truncate text-modern-accent2" style={{ color: '#00d2df' }}>{currentTrack.title}</div>
              <div className="mb-1 text-xs truncate text-modern-gray" style={{ color: '#6ee7ef' }}>{currentTrack.artist}</div>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Anterior"
                  onClick={handlePrev}
                  className="focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaStepBackward size={14} color="#00d2df" />
                </button>
                <button
                  aria-label={playing ? 'Pausar' : 'Tocar'}
                  onClick={() => setPlaying((p) => !p)}
                  className="focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: playing ? '0 0 0 2px #00d2df' : undefined,
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  {playing ? <FaPause size={18} color="#00d2df" /> : <FaPlay size={18} color="#00d2df" />}
                </button>
                <button
                  aria-label="Próxima"
                  onClick={handleNext}
                  className="focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaStepForward size={14} color="#00d2df" />
                </button>
                <input
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
                  style={{ flex: 1, accentColor: '#00d2df', height: 4 }}
                  aria-label="Progresso da música"
                />
                <div className="text-xs" style={{ color: '#00d2df', minWidth: 38, textAlign: 'right' }}>
                  {formatTime(played * duration)}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <button
                  aria-label={muted ? 'Ativar som' : 'Mutar'}
                  onClick={() => setMuted((m) => !m)}
                  className="focus:outline-none"
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  {muted || volume === 0 ? (
                    <FaVolumeMute size={16} color="#00d2df" />
                  ) : (
                    <FaVolumeUp size={16} color="#00d2df" />
                  )}
                </button>
                <input
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
                  style={{ width: 60, accentColor: '#00d2df', height: 4 }}
                  aria-label="Volume"
                />
                <button
                  aria-label="Minimizar player"
                  onClick={() => setMinimized(true)}
                  className="ml-auto focus:outline-none"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaChevronDown size={16} color="#00d2df" />
                </button>
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