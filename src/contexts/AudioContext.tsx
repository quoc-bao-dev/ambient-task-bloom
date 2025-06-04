
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  category: string;
}

interface AudioContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playlist: AudioTrack[];
  playTrack: (track: AudioTrack) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setCurrentTime: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Ambient and focus music URLs (using YouTube audio or similar services)
const DEFAULT_PLAYLIST: AudioTrack[] = [
  {
    id: '1',
    title: 'Rain Sounds',
    artist: 'Nature Sounds',
    url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBSuBzvLZiTYIG2u+7+OZSA0PVqzn77BeGgU+k9n1unEgAy5+zPLaizsIGGS57OOaSwwOUarm8bllHgg2jdXzzn0vBSF1xe/eizEIEV23+bN4SAoUXrPo5KdUFAhVpe7wvmEaBDyO2fO9dSQB+b4htt7Rz9Ml7yFe8fX6dKq/2N3b0+fm2HUzCyKC2PK9diQCJnXG8+KOOwktb8kASQAMH2ASQAAMH4h7l..',
    category: 'Nature'
  },
  {
    id: '2',
    title: 'Forest Ambience',
    artist: 'Nature Sounds',
    url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBSuBzvLZiTYIG2u+7+OZSA0PVqzn77BeGgU+k9n1unEgAy5+zPLaizsIGGS57OOaSwwOUarm8bllHgg2jdXzzn0vBSF1xe/eizEIEV23+bN4SAoUXrPo5KdUFAhVpe7wvmEaBDyO2fO9dSQB+b4htt7Rz9Ml7yFe8fX6dKq/2N3b0+fm2HUzCyKC2PK9diQCJnXG8+KOOwktb8kASQAMH2ASQAAMH4h7l..',
    category: 'Nature'
  },
  {
    id: '3',
    title: 'Ocean Waves',
    artist: 'Nature Sounds',
    url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBSuBzvLZiTYIG2u+7+OZSA0PVqzn77BeGgU+k9n1unEgAy5+zPLaizsIGGS57OOaSwwOUarm8bllHgg2jdXzzn0vBSF1xe/eizEIEV23+bN4SAoUXrPo5KdUFAhVpe7wvmEaBDyO2fO9dSQB+b4htt7Rz9Ml7yFe8fX6dKq/2N3b0+fm2HUzCyKC2PK9diQCJnXG8+KOOwktb8kASQAMH2ASQAAMH4h7l..',
    category: 'Nature'
  },
  {
    id: '4',
    title: 'Piano Meditation',
    artist: 'Peaceful Piano',
    url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBSuBzvLZiTYIG2u+7+OZSA0PVqzn77BeGgU+k9n1unEgAy5+zPLaizsIGGS57OOaSwwOUarm8bllHgg2jdXzzn0vBSF1xe/eizEIEV23+bN4SAoUXrPo5KdUFAhVpe7wvmEaBDyO2fO9dSQB+b4htt7Rz9Ml7yFe8fX6dKq/2N3b0+fm2HUzCyKC2PK9diQCJnXG8+KOOwktb8kASQAMH2ASQAAMH4h7l..',
    category: 'Piano'
  },
  {
    id: '5',
    title: 'Focus Flow',
    artist: 'Ambient Focus',
    url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBSuBzvLZiTYIG2u+7+OZSA0PVqzn77BeGgU+k9n1unEgAy5+zPLaizsIGGS57OOaSwwOUarm8bllHgg2jdXzzn0vBSF1xe/eizEIEV23+bN4SAoUXrPo5KdUFAhVpe7wvmEaBDyO2fO9dSQB+b4htt7Rz9Ml7yFe8fX6dKq/2N3b0+fm2HUzCyKC2PK9diQCJnXG8+KOOwktb8kASQAMH2ASQAAMH4h7l..',
    category: 'Ambient'
  }
];

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(50);
  const [currentTime, setCurrentTimeState] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist] = useState<AudioTrack[]>(DEFAULT_PLAYLIST);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (currentTrack && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTimeState(audioRef.current?.currentTime || 0);
      });
      audioRef.current.addEventListener('ended', () => {
        nextTrack();
      });
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const playTrack = (track: AudioTrack) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentTrack(track);
    audioRef.current = new Audio(track.url);
    audioRef.current.volume = volume / 100;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playTrack(playlist[nextIndex]);
  };

  const prevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playTrack(playlist[prevIndex]);
  };

  const setCurrentTime = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      volume,
      currentTime,
      duration,
      playlist,
      playTrack,
      togglePlay,
      setVolume,
      nextTrack,
      prevTrack,
      setCurrentTime
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
