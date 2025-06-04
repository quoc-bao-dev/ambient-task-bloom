
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import TaskManager from '@/components/TaskManager';
import PomodoroTimer from '@/components/PomodoroTimer';
import MusicPlayer from '@/components/MusicPlayer';
import { Leaf, Sun, Moon } from 'lucide-react';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Auto dark mode based on time
    const hours = new Date().getHours();
    setIsDarkMode(hours < 7 || hours > 19);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-green-900' 
        : 'bg-gradient-to-br from-sky-100 via-green-50 to-blue-100'
    }`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-blue-200/20 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-300/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className={`h-8 w-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'} animate-pulse`} />
            <h1 className={`text-4xl font-light ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Thiên Nhiên Focus
            </h1>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-600'
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
          <p className={`text-lg ${isDarkMode ? 'text-green-200' : 'text-green-700'} font-light`}>
            Làm việc hiệu quả trong không gian yên bình
          </p>
          <p className={`text-2xl font-mono mt-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>
            {formatTime(currentTime)}
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Manager */}
          <div className="lg:col-span-2">
            <Card className={`p-6 backdrop-blur-sm border-0 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800/50 text-white' 
                : 'bg-white/70 text-slate-800'
            }`}>
              <TaskManager isDarkMode={isDarkMode} />
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Pomodoro Timer */}
            <Card className={`p-6 backdrop-blur-sm border-0 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800/50 text-white' 
                : 'bg-white/70 text-slate-800'
            }`}>
              <PomodoroTimer isDarkMode={isDarkMode} />
            </Card>

            {/* Music Player */}
            <Card className={`p-6 backdrop-blur-sm border-0 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800/50 text-white' 
                : 'bg-white/70 text-slate-800'
            }`}>
              <MusicPlayer isDarkMode={isDarkMode} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
