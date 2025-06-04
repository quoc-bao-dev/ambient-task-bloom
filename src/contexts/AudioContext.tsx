import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

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
  isLoading: boolean;
  error: string | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Real focus and ambient music URLs (using freely available sources)
const DEFAULT_PLAYLIST: AudioTrack[] = [
  {
    id: "1",
    title: "Rain Sounds",
    artist: "Nature Sounds",
    url: "/sounds/elegant-background_outro-1.mp3", // Replace with a valid URL or local file path
    category: "Nature",
  },
  {
    id: "2",
    title: "Forest Ambience",
    artist: "Nature Sounds",
    url: "/sounds/morning-in-the-forest.mp3", // Replace with a valid URL or local file path
    category: "Nature",
  },
  {
    id: "3",
    title: "Ocean Waves",
    artist: "Nature Sounds",
    url: "/sounds/morning-in-the-forest.mp3",
    category: "Nature",
  },
  {
    id: "4",
    title: "Peaceful Piano",
    artist: "Ambient Focus",
    url: "/sounds/morning-in-the-forest.mp3",
    category: "Piano",
  },
  {
    id: "5",
    title: "Focus Flow",
    artist: "Ambient Focus",
    url: "/sounds/morning-in-the-forest.mp3",
    category: "Ambient",
  },
];

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(50);
  const [currentTime, setCurrentTimeState] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist] = useState<AudioTrack[]>(DEFAULT_PLAYLIST);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const handleLoadedMetadata = () => {
        setDuration(audio.duration || 0);
        setIsLoading(false);
      };

      const handleTimeUpdate = () => {
        setCurrentTimeState(audio.currentTime || 0);
      };

      const handleEnded = () => {
        nextTrack();
      };

      const handleLoadStart = () => {
        setIsLoading(true);
        setError(null);
      };

      const handleError = () => {
        setIsLoading(false);
        setError("Không thể tải nhạc này");
        setIsPlaying(false);
      };

      const handleCanPlay = () => {
        setIsLoading(false);
        setError(null);
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("loadstart", handleLoadStart);
      audio.addEventListener("error", handleError);
      audio.addEventListener("canplay", handleCanPlay);

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("loadstart", handleLoadStart);
        audio.removeEventListener("error", handleError);
        audio.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const playTrack = async (track: AudioTrack) => {
    setIsLoading(true);
    setError(null);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    setCurrentTrack(track);
    audioRef.current = new Audio();
    audioRef.current.volume = volume / 100;
    audioRef.current.crossOrigin = "anonymous";

    try {
      audioRef.current.src = track.url;
      await audioRef.current.load();
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Error playing track:", err);
      setError("Không thể phát nhạc này");
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current || !currentTrack) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Error toggling play:", err);
      setError("Không thể phát nhạc");
      setIsPlaying(false);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    const nextIndex = (currentIndex + 1) % playlist.length;
    playTrack(playlist[nextIndex]);
  };

  const prevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playTrack(playlist[prevIndex]);
  };

  const setCurrentTime = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return (
    <AudioContext.Provider
      value={{
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
        setCurrentTime,
        isLoading,
        error,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
