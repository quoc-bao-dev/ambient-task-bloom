
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PomodoroTimerProps {
  isDarkMode: boolean;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ isDarkMode }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycle, setCycle] = useState(1);
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const workDuration = 25 * 60; // 25 minutes
  const breakDuration = 5 * 60; // 5 minutes
  const longBreakDuration = 15 * 60; // 15 minutes

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (!isBreak) {
      // Work session completed
      if (cycle % 4 === 0) {
        // Long break after 4 cycles
        setTimeLeft(longBreakDuration);
        toast({
          title: "🎉 Hoàn thành xuất sắc!",
          description: "Đã hoàn thành 4 chu kỳ. Hãy nghỉ dài 15 phút!",
        });
      } else {
        // Short break
        setTimeLeft(breakDuration);
        toast({
          title: "✨ Xin chúc mừng!",
          description: "Đã hoàn thành 1 chu kỳ làm việc. Nghỉ 5 phút nhé!",
        });
      }
      setIsBreak(true);
    } else {
      // Break completed
      setTimeLeft(workDuration);
      setIsBreak(false);
      setCycle(prev => prev + 1);
      toast({
        title: "🌱 Sẵn sàng làm việc",
        description: "Hết giờ nghỉ. Bắt đầu chu kỳ làm việc mới!",
      });
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(workDuration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? ((breakDuration - timeLeft) / breakDuration) * 100
    : ((workDuration - timeLeft) / workDuration) * 100;

  return (
    <div className="space-y-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Timer className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h3 className="text-xl font-light">Pomodoro Timer</h3>
      </div>

      {/* Timer Display */}
      <div className="relative">
        <div className={`w-48 h-48 mx-auto rounded-full border-8 ${
          isBreak 
            ? isDarkMode ? 'border-green-400/30' : 'border-green-500/30'
            : isDarkMode ? 'border-blue-400/30' : 'border-blue-500/30'
        } flex items-center justify-center relative overflow-hidden`}>
          {/* Progress Circle */}
          <div 
            className={`absolute inset-0 rounded-full ${
              isBreak 
                ? 'bg-gradient-to-br from-green-400/20 to-green-600/20'
                : 'bg-gradient-to-br from-blue-400/20 to-blue-600/20'
            }`}
            style={{
              background: `conic-gradient(${
                isBreak 
                  ? isDarkMode ? '#34d399' : '#10b981'
                  : isDarkMode ? '#60a5fa' : '#3b82f6'
              } ${progress * 3.6}deg, transparent 0deg)`
            }}
          ></div>
          
          {/* Timer Text */}
          <div className="relative z-10 text-center">
            <div className="text-4xl font-mono font-bold mb-2">
              {formatTime(timeLeft)}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {isBreak ? '🌸 Nghỉ ngơi' : '💼 Làm việc'}
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Chu kỳ: {cycle} • {isBreak ? 'Đang nghỉ' : 'Đang làm việc'}
        </p>
        <div className={`text-xs px-3 py-1 rounded-full inline-block ${
          isActive 
            ? isBreak 
              ? 'bg-green-500/20 text-green-400'
              : 'bg-blue-500/20 text-blue-400'
            : isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-600'
        }`}>
          {isActive ? (isBreak ? 'Đang nghỉ ngơi...' : 'Đang tập trung...') : 'Tạm dừng'}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <Button
          onClick={toggleTimer}
          className={`${
            isActive 
              ? 'bg-red-500 hover:bg-red-600' 
              : isBreak 
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isActive ? 'Tạm dừng' : 'Bắt đầu'}
        </Button>
        
        <Button
          onClick={resetTimer}
          variant="outline"
          className={`${
            isDarkMode 
              ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Tips */}
      <div className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'} max-w-xs mx-auto`}>
        💡 Kỹ thuật Pomodoro: 25 phút làm việc, 5 phút nghỉ. Sau 4 chu kỳ sẽ có 15 phút nghỉ dài.
      </div>
    </div>
  );
};

export default PomodoroTimer;
