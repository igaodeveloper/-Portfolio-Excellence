import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaVolumeUp,
  FaVolumeMute,
} from 'react-icons/fa';
import { IoMdSkipForward, IoMdSkipBackward } from 'react-icons/io';
import { motion, useDragControls, PanInfo } from 'framer-motion';

interface VideoPlayerProps {
  url?: string;
  title?: string;
  poster?: string;
  autoPlay?: boolean;
  videos?: Array<{
    id: string | number;
    url: string;
    title: string;
    thumbnail: string;
  }>;
  onVideoChange?: (index: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  title,
  poster,
  autoPlay = false,
  videos = [],
  onVideoChange,
}) => {
  const [playing, setPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [buffering, setBuffering] = useState(false);

  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Efeito para controles de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setPlaying(!playing);
      } else if (e.code === 'ArrowRight') {
        playerRef.current?.seekTo(played + 0.05);
      } else if (e.code === 'ArrowLeft') {
        playerRef.current?.seekTo(played - 0.05);
      } else if (e.code === 'KeyM') {
        setMuted(!muted);
      } else if (e.code === 'KeyF') {
        toggleFullscreen();
      } else if (e.code === 'ArrowUp') {
        // Aumenta o volume
        setVolume((prev) => Math.min(prev + 0.1, 1));
        setMuted(false);
      } else if (e.code === 'ArrowDown') {
        // Diminui o volume
        setVolume((prev) => Math.max(prev - 0.1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playing, played, muted]);

  // Mostrar controles quando o mouse se move
  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = () => {
      setShowControls(true);

      // Limpar o timeout anterior, se existir
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      // Definir um novo timeout para esconder os controles após 3 segundos
      controlsTimeoutRef.current = setTimeout(() => {
        if (playing && !hovering) {
          setShowControls(false);
        }
      }, 3000);
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [playing, hovering]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const handleProgress = (state: {
    played: number;
    loaded: number;
    playedSeconds: number;
  }) => {
    if (!seeking) {
      setPlayed(state.played);
      setLoaded(state.loaded);
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    playerRef.current?.seekTo(parseFloat((e.target as HTMLInputElement).value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleBuffer = (buffering: boolean) => {
    setBuffering(buffering);
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');

    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }

    return `${mm}:${ss}`;
  };

  // Função para lidar com o gesto de arrastar
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    // Encontrar o índice atual
    const currentIndex = videos.findIndex((video) => video.url === url);
    if (currentIndex === -1) return;

    // Se arrastar para a esquerda, vai para o próximo vídeo
    if (info.offset.x < -100) {
      const nextIndex = (currentIndex + 1) % videos.length;
      if (onVideoChange) {
        onVideoChange(nextIndex);
      }
    }
    // Se arrastar para a direita, vai para o vídeo anterior
    else if (info.offset.x > 100) {
      const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
      if (onVideoChange) {
        onVideoChange(prevIndex);
      }
    }
  };

  // Função para navegar entre vídeos
  const handleSkipForward = () => {
    const currentIndex = videos.findIndex((video) => video.url === url);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % videos.length;
    if (onVideoChange) {
      onVideoChange(nextIndex);
    }
  };

  const handleSkipBackward = () => {
    const currentIndex = videos.findIndex((video) => video.url === url);
    if (currentIndex === -1) return;

    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    if (onVideoChange) {
      onVideoChange(prevIndex);
    }
  };

  return (
    <div
      className="relative aspect-video bg-black"
      ref={containerRef}
      onMouseEnter={() => {
        setHovering(true);
        setShowControls(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
        if (playing) {
          setShowControls(false);
        }
      }}
    >
      <motion.div
        className="h-full w-full"
        ref={playerContainerRef}
        drag="x"
        dragControls={dragControls}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
      >
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onBuffer={() => handleBuffer(true)}
          onBufferEnd={() => handleBuffer(false)}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                showinfo: 0,
                rel: 0,
                iv_load_policy: 3,
                origin: window.location.origin,
              },
            },
          }}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />

        {/* Navegação lateral */}
        <div className="absolute inset-y-0 left-0 w-1/3 flex items-center justify-start opacity-0 hover:opacity-100 transition-opacity z-20">
          <motion.div
            className="ml-4 p-2.5 rounded-full bg-black/50 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSkipBackward}
          >
            <IoMdSkipBackward size={18} className="text-white" />
          </motion.div>
        </div>

        <div className="absolute inset-y-0 right-0 w-1/3 flex items-center justify-end opacity-0 hover:opacity-100 transition-opacity z-20">
          <motion.div
            className="mr-4 p-2.5 rounded-full bg-black/50 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSkipForward}
          >
            <IoMdSkipForward size={18} className="text-white" />
          </motion.div>
        </div>

        {/* Overlay de buffering */}
        {buffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-30">
            <div className="w-16 h-16 border-4 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Botão central de play/pause */}
        <motion.button
          onClick={handlePlayPause}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 w-16 h-16 flex items-center justify-center rounded-full z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: !playing || showControls || hovering ? 1 : 0,
            scale: !playing || showControls || hovering ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        >
          {playing ? (
            <FaPause size={24} className="text-white" />
          ) : (
            <FaPlay size={24} className="text-white ml-1" />
          )}
        </motion.button>

        {/* Controles inferiores - estilo YouTube */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-16 pb-2 px-3 z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: showControls || hovering || !playing ? 1 : 0,
            y: showControls || hovering || !playing ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Barra de progresso - estilo YouTube */}
          <div className="group relative mb-2">
            <div className="h-1 bg-gray-600/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-400/40 rounded-full"
                style={{ width: `${loaded * 100}%` }}
              ></div>
              <div
                className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
                style={{ width: `${played * 100}%` }}
              ></div>
            </div>
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className="absolute -top-2 left-0 w-full appearance-none bg-transparent cursor-pointer h-5 opacity-0 z-30"
            />
            <div
              className="absolute h-3 w-3 bg-red-600 rounded-full transform -translate-y-1/2 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${played * 100}% - 6px)` }}
            ></div>
          </div>

          {/* Controles e tempo - estilo YouTube */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {/* Botão Play/Pause */}
              <button
                onClick={handlePlayPause}
                className="text-white focus:outline-none"
              >
                {playing ? <FaPause size={16} /> : <FaPlay size={16} />}
              </button>

              {/* Tempo */}
              <div className="text-white text-xs">
                {formatTime(played * duration)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Volume */}
              <div className="group relative flex items-center">
                <button
                  onClick={handleMute}
                  className="text-white focus:outline-none"
                >
                  {muted ? (
                    <FaVolumeMute size={16} />
                  ) : (
                    <FaVolumeUp size={16} />
                  )}
                </button>
                <div className="hidden group-hover:block w-16 ml-1">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-gray-500 rounded-full appearance-none cursor-pointer accent-red-600"
                  />
                </div>
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white focus:outline-none"
              >
                {fullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Overlay para click to play/pause */}
        <div
          className="absolute inset-0 cursor-pointer z-10"
          onClick={handlePlayPause}
        />
      </motion.div>

      {/* Dica de swipe */}
      <motion.div
        className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-sm z-30 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: hovering && !buffering ? 1 : 0,
          y: hovering && !buffering ? 0 : 10,
        }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        Arraste para os lados para trocar de vídeo
      </motion.div>
    </div>
  );
};

export default VideoPlayer;
