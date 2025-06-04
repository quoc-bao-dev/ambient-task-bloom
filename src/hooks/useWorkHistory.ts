
import { useState, useEffect } from 'react';

export interface WorkSession {
  id: string;
  date: string;
  type: 'work' | 'break';
  duration: number; // in seconds
  completed: boolean;
  timestamp: number;
}

export interface DayStats {
  date: string;
  totalWorkTime: number;
  totalSessions: number;
  completedSessions: number;
  focusScore: number;
}

const STORAGE_KEY = 'pomodoro-work-history';

export const useWorkHistory = () => {
  const [sessions, setSessions] = useState<WorkSession[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSessions(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading work history:', error);
      }
    }
  }, []);

  const addSession = (session: Omit<WorkSession, 'id' | 'timestamp'>) => {
    const newSession: WorkSession = {
      ...session,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
  };

  const getStatsForDate = (date: string): DayStats => {
    const daySessions = sessions.filter(session => session.date === date);
    const workSessions = daySessions.filter(session => session.type === 'work');
    
    const totalWorkTime = workSessions.reduce((total, session) => 
      session.completed ? total + session.duration : total, 0
    );
    
    const completedSessions = workSessions.filter(session => session.completed).length;
    const focusScore = workSessions.length > 0 ? 
      Math.round((completedSessions / workSessions.length) * 100) : 0;

    return {
      date,
      totalWorkTime,
      totalSessions: workSessions.length,
      completedSessions,
      focusScore,
    };
  };

  const getRecentStats = (days: number = 7): DayStats[] => {
    const today = new Date();
    const stats: DayStats[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      stats.push(getStatsForDate(dateString));
    }

    return stats;
  };

  const getTodayStats = (): DayStats => {
    const today = new Date().toISOString().split('T')[0];
    return getStatsForDate(today);
  };

  return {
    sessions,
    addSession,
    getStatsForDate,
    getRecentStats,
    getTodayStats,
  };
};
