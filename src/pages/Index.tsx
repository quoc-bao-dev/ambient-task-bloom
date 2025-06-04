
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import TaskManager from '@/components/TaskManager';
import PomodoroTimer from '@/components/PomodoroTimer';
import MusicPlayer from '@/components/MusicPlayer';
import { Focus, Settings } from 'lucide-react';

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

  const neumorphicCard = `${
    isDarkMode 
      ? 'bg-slate-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]' 
      : 'bg-gray-100 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]'
  }`;

  const neumorphicButton = `${
    isDarkMode 
      ? 'bg-slate-800 shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(255,255,255,0.1)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]' 
      : 'bg-gray-100 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]'
  }`;

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-slate-900' 
        : 'bg-gray-100'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`p-3 rounded-full ${neumorphicCard}`}>
              <Focus className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h1 className={`text-4xl font-light tracking-wide ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              FocusFlow Pro
            </h1>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-full transition-all duration-300 ${neumorphicButton}`}
            >
              <Settings className={`h-5 w-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-light mb-2`}>
            Nâng cao hiệu quả làm việc với phương pháp khoa học
          </p>
          <div className={`inline-block px-6 py-2 rounded-full ${neumorphicCard}`}>
            <p className={`text-xl font-mono ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              {formatTime(currentTime)}
            </p>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Manager */}
          <div className="lg:col-span-2">
            <div className={`p-6 rounded-3xl border-0 ${neumorphicCard} ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              <TaskManager isDarkMode={isDarkMode} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Pomodoro Timer */}
            <div className={`p-6 rounded-3xl border-0 ${neumorphicCard} ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              <PomodoroTimer isDarkMode={isDarkMode} />
            </div>

            {/* Music Player */}
            <div className={`p-6 rounded-3xl border-0 ${neumorphicCard} ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              <MusicPlayer isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
