import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PomodoroSettings from './PomodoroSettings';
import { useWorkHistory } from '@/hooks/useWorkHistory';

interface PomodoroTimerProps {
  isDarkMode: boolean;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ isDarkMode }) => {
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const [longBreakDuration, setLongBreakDuration] = useState(15 * 60);
  
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [sessionStart, setSessionStart] = useState<number | null>(null);
  
  const { toast } = useToast();
  const { addSession } = useWorkHistory();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const neumorphicButton = `${
    isDarkMode 
      ? 'bg-slate-800 shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(255,255,255,0.1)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]' 
      : 'bg-gray-100 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]'
  }`;

  const neumorphicCircle = `${
    isDarkMode 
      ? 'bg-slate-800 shadow-[inset_8px_8px_15px_rgba(0,0,0,0.5),inset_-8px_-8px_15px_rgba(255,255,255,0.1)]' 
      : 'bg-gray-100 shadow-[inset_8px_8px_15px_rgba(0,0,0,0.1),inset_-8px_-8px_15px_rgba(255,255,255,0.9)]'
  }`;

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
    
    // Save session to history
    if (sessionStart) {
      const currentDuration = isBreak ? 
        (cycle % 4 === 0 ? longBreakDuration : breakDuration) : 
        workDuration;
      
      addSession({
        date: new Date().toISOString().split('T')[0],
        type: isBreak ? 'break' : 'work',
        duration: currentDuration,
        completed: true,
      });
    }

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
    setSessionStart(null);
  };

  const toggleTimer = () => {
    if (!isActive && !sessionStart) {
      setSessionStart(Date.now());
    } else if (!isActive && sessionStart) {
      // Save incomplete session when stopping
      const elapsed = (Date.now() - sessionStart) / 1000;
      addSession({
        date: new Date().toISOString().split('T')[0],
        type: isBreak ? 'break' : 'work',
        duration: Math.floor(elapsed),
        completed: false,
      });
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (sessionStart && isActive) {
      // Save incomplete session when resetting
      const elapsed = (Date.now() - sessionStart) / 1000;
      addSession({
        date: new Date().toISOString().split('T')[0],
        type: isBreak ? 'break' : 'work',
        duration: Math.floor(elapsed),
        completed: false,
      });
    }
    
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(workDuration);
    setSessionStart(null);
  };

  const handleSettingsSave = (settings: {
    workDuration: number;
    breakDuration: number;
    longBreakDuration: number;
  }) => {
    setWorkDuration(settings.workDuration);
    setBreakDuration(settings.breakDuration);
    setLongBreakDuration(settings.longBreakDuration);
    
    // Reset timer with new work duration if not active
    if (!isActive && !isBreak) {
      setTimeLeft(settings.workDuration);
    }
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Timer className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className="text-xl font-light">Pomodoro Focus</h3>
        </div>
        <PomodoroSettings
          isDarkMode={isDarkMode}
          workDuration={workDuration}
          breakDuration={breakDuration}
          longBreakDuration={longBreakDuration}
          onSave={handleSettingsSave}
        />
      </div>

      {/* Timer Display */}
      <div className="relative">
        <div className={`w-48 h-48 mx-auto rounded-full ${neumorphicCircle} flex items-center justify-center relative overflow-hidden`}>
          {/* Progress Circle */}
          <div 
            className="absolute inset-4 rounded-full"
            style={{
              background: `conic-gradient(${
                isBreak 
                  ? isDarkMode ? '#10b981' : '#059669'
                  : isDarkMode ? '#3b82f6' : '#2563eb'
              } ${progress * 3.6}deg, transparent 0deg)`
            }}
          ></div>
          
          {/* Inner Circle */}
          <div className={`w-32 h-32 rounded-full ${neumorphicCircle} flex items-center justify-center`}>
            <div className="text-center">
              <div className="text-3xl font-mono font-bold mb-1">
                {formatTime(timeLeft)}
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {isBreak ? 'Nghỉ ngơi' : 'Tập trung'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Chu kỳ {cycle} • {isBreak ? 'Đang nghỉ' : 'Đang làm việc'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${neumorphicButton} ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}
        >
          {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isActive ? 'Tạm dừng' : 'Bắt đầu'}
        </button>
        
        <button
          onClick={resetTimer}
          className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 ${neumorphicButton} ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Tips */}
      <div className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'} max-w-xs mx-auto`}>
        💡 Kỹ thuật Pomodoro: 25 phút làm việc, 5 phút nghỉ. Sau 4 chu kỳ sẽ có 15 phút nghỉ dài.
      </div>
    </div>
  );
};

export default PomodoroTimer;
