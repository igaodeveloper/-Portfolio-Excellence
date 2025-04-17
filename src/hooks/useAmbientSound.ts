import { useState, useEffect, useCallback } from 'react';

export function useAmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.1);

  useEffect(() => {
    // Create audio element with a subtle synth ambient sound
    const audioElement = new Audio('/ambient-synth.mp3');
    audioElement.loop = true;
    audioElement.volume = volume;
    setAudio(audioElement);

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, []);

  const toggleSound = useCallback(() => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // Start with a fade in
      audio.volume = 0;
      audio.play();
      const fadeIn = setInterval(() => {
        if (audio.volume < volume) {
          audio.volume = Math.min(audio.volume + 0.01, volume);
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    }
    setIsPlaying(!isPlaying);
  }, [audio, isPlaying, volume]);

  const adjustVolume = useCallback((newVolume: number) => {
    if (!audio) return;
    audio.volume = newVolume;
    setVolume(newVolume);
  }, [audio]);

  return {
    isPlaying,
    toggleSound,
    adjustVolume,
    volume
  };
} 