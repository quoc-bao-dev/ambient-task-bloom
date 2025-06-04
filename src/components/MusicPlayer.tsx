
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  category: string;
  description: string;
  audioUrl?: string; // For demo, we'll use nature sounds
}

interface MusicPlayerProps {
  isDarkMode: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isDarkMode }) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Demo playlist with nature sounds and relaxing music
  const playlist: Track[] = [
    {
      id: '1',
      title: 'Mưa Nhẹ',
      artist: 'Âm Thanh Thiên Nhiên',
      category: 'Thiên nhiên',
      description: 'Tiếng mưa nhẹ rơi, tạo cảm giác thư thái'
    },
    {
      id: '2',
      title: 'Rừng Xanh',
      artist: 'Âm Thanh Thiên Nhiên',
      category: 'Thiên nhiên',
      description: 'Tiếng chim hót trong rừng xanh mát'
    },
    {
      id: '3',
      title: 'Sóng Biển',
      artist: 'Âm Thanh Thiên Nhiên',
      category: 'Thiên nhiên',
      description: 'Âm thanh sóng biển êm dịu'
    },
    {
      id: '4',
      title: 'Piano Meditation',
      artist: 'Peaceful Piano',
      category: 'Instrumental',
      description: 'Nhạc piano nhẹ nhàng để thiền định'
    },
    {
      id: '5',
      title: 'Ambient Forest',
      artist: 'Nature Sounds',
      category: 'Ambient',
      description: 'Âm thanh rừng cây thư giãn'
    }
  ];

  const track = playlist[currentTrack];

  // Simulate audio for demo (in real app, you'd load actual audio files)
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 180) { // 3 minutes demo
            nextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Music className={`h-6 w-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
        <h3 className="text-xl font-light">Âm Nhạc Thư Giãn</h3>
      </div>

      {/* Current Track Display */}
      <div className="text-center space-y-2">
        <div className={`w-24 h-24 mx-auto rounded-full ${
          track.category === 'Thiên nhiên' 
            ? 'bg-gradient-to-br from-green-400 to-blue-500'
            : track.category === 'Instrumental'
            ? 'bg-gradient-to-br from-purple-400 to-pink-500'
            : 'bg-gradient-to-br from-blue-400 to-green-500'
        } flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
          <Music className="h-8 w-8 text-white" />
        </div>
        
        <div>
          <h4 className="font-medium">{track.title}</h4>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {track.artist}
          </p>
          <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'} mt-1`}>
            {track.description}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className={`w-full h-1 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
          <div 
            className="h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentTime / 180) * 100}%` }}
          ></div>
        </div>
        <div className={`flex justify-between text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <span>{formatTime(currentTime)}</span>
          <span>3:00</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevTrack}
          className={`${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full ${
            isPlaying 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextTrack}
          className={`${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Volume2 className={`h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
          <Slider
            value={volume}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} w-8`}>
            {volume[0]}%
          </span>
        </div>
      </div>

      {/* Playlist Preview */}
      <div className="space-y-2">
        <h4 className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          Danh sách phát
        </h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {playlist.map((track, index) => (
            <button
              key={track.id}
              onClick={() => {setCurrentTrack(index); setCurrentTime(0);}}
              className={`w-full text-left p-2 rounded text-xs transition-colors ${
                index === currentTrack
                  ? isDarkMode 
                    ? 'bg-blue-900/30 text-blue-400' 
                    : 'bg-blue-100 text-blue-700'
                  : isDarkMode
                    ? 'hover:bg-slate-700/50 text-slate-400'
                    : 'hover:bg-gray-100 text-slate-600'
              }`}
            >
              <div className="font-medium">{track.title}</div>
              <div className="opacity-75">{track.artist}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'} text-center`}>
        🎵 Âm nhạc giúp tăng sự tập trung và giảm stress
      </div>
    </div>
  );
};

export default MusicPlayer;
