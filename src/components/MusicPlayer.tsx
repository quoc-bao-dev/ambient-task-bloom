
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';

interface MusicPlayerProps {
  isDarkMode: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isDarkMode }) => {
  const {
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
    prevTrack
  } = useAudio();

  const neumorphicButton = `${
    isDarkMode 
      ? 'bg-slate-800 shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(255,255,255,0.1)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]' 
      : 'bg-gray-100 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]'
  }`;

  const neumorphicCard = `${
    isDarkMode 
      ? 'bg-slate-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]' 
      : 'bg-gray-100 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]'
  }`;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const getTrackIcon = (category: string) => {
    switch (category) {
      case 'Nature':
        return '🌿';
      case 'Piano':
        return '🎹';
      case 'Ambient':
        return '🌊';
      default:
        return '🎵';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Music className={`h-6 w-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
        <h3 className="text-xl font-light">Focus Music</h3>
      </div>

      {/* Current Track Display */}
      {currentTrack ? (
        <div className="text-center space-y-4">
          <div className={`w-24 h-24 mx-auto rounded-full ${neumorphicCard} flex items-center justify-center text-2xl`}>
            {getTrackIcon(currentTrack.category)}
          </div>
          
          <div>
            <h4 className="font-medium">{currentTrack.title}</h4>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {currentTrack.artist}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className={`w-full h-2 rounded-full ${neumorphicCard}`}>
              <div 
                className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
              ></div>
            </div>
            <div className={`flex justify-between text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className={`w-24 h-24 mx-auto rounded-full ${neumorphicCard} flex items-center justify-center`}>
            <Music className={`h-8 w-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Chọn nhạc để bắt đầu
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={prevTrack}
          className={`p-3 rounded-full transition-all duration-300 ${neumorphicButton}`}
          disabled={!currentTrack}
        >
          <SkipBack className="h-4 w-4" />
        </button>
        
        <button
          onClick={togglePlay}
          className={`p-4 rounded-full transition-all duration-300 ${neumorphicButton}`}
          disabled={!currentTrack}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        
        <button
          onClick={nextTrack}
          className={`p-3 rounded-full transition-all duration-300 ${neumorphicButton}`}
          disabled={!currentTrack}
        >
          <SkipForward className="h-4 w-4" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Volume2 className={`h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} w-8`}>
            {volume}%
          </span>
        </div>
      </div>

      {/* Playlist */}
      <div className="space-y-2">
        <h4 className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          Playlist Focus
        </h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {playlist.map((track) => (
            <button
              key={track.id}
              onClick={() => playTrack(track)}
              className={`w-full text-left p-2 rounded-lg text-xs transition-all duration-300 ${
                currentTrack?.id === track.id
                  ? isDarkMode 
                    ? 'bg-blue-900/30 text-blue-400' 
                    : 'bg-blue-100 text-blue-700'
                  : `${neumorphicButton}`
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{getTrackIcon(track.category)}</span>
                <div>
                  <div className="font-medium">{track.title}</div>
                  <div className="opacity-75">{track.artist}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'} text-center`}>
        🎧 Âm nhạc giúp tăng sự tập trung và năng suất
      </div>
    </div>
  );
};

export default MusicPlayer;
