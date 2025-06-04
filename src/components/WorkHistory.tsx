
import React from 'react';
import { Button } from '@/components/ui/button';
import { History, TrendingUp, Target, Clock } from 'lucide-react';
import { useWorkHistory } from '@/hooks/useWorkHistory';
import { useNavigate } from 'react-router-dom';

interface WorkHistoryProps {
  isDarkMode: boolean;
}

const WorkHistory: React.FC<WorkHistoryProps> = ({ isDarkMode }) => {
  const { getTodayStats, getRecentStats } = useWorkHistory();
  const navigate = useNavigate();
  const todayStats = getTodayStats();
  const weekStats = getRecentStats(7);

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

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const weekTotal = weekStats.reduce((total, day) => total + day.totalWorkTime, 0);
  const avgFocusScore = weekStats.reduce((total, day) => total + day.focusScore, 0) / 7;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className="text-lg font-light">Lịch sử làm việc</h3>
        </div>
        <Button
          onClick={() => navigate('/work-history')}
          variant="ghost"
          size="sm"
          className={`transition-all duration-300 ${neumorphicButton} ${
            isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          Xem chi tiết
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Today Stats */}
        <div className={`p-4 rounded-2xl ${neumorphicCard}`}>
          <div className="flex items-center gap-2 mb-2">
            <Clock className={`h-4 w-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Hôm nay
            </span>
          </div>
          <div className="text-xl font-bold">
            {formatTime(todayStats.totalWorkTime)}
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {todayStats.completedSessions} phiên hoàn thành
          </div>
        </div>

        {/* Focus Score */}
        <div className={`p-4 rounded-2xl ${neumorphicCard}`}>
          <div className="flex items-center gap-2 mb-2">
            <Target className={`h-4 w-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Điểm tập trung
            </span>
          </div>
          <div className="text-xl font-bold">
            {todayStats.focusScore}%
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Trung bình 7 ngày: {Math.round(avgFocusScore)}%
          </div>
        </div>
      </div>

      {/* Week Overview */}
      <div className={`p-4 rounded-2xl ${neumorphicCard}`}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className={`h-4 w-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Tuần này
          </span>
        </div>
        <div className="text-lg font-bold mb-2">
          {formatTime(weekTotal)}
        </div>
        <div className="flex justify-between gap-1">
          {weekStats.slice(-7).map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-6 h-8 rounded-sm ${
                  day.totalWorkTime > 0 
                    ? isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
                    : isDarkMode ? 'bg-slate-700' : 'bg-gray-300'
                }`}
                style={{
                  height: `${Math.max(8, (day.totalWorkTime / 3600) * 20)}px`
                }}
              />
              <span className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {new Date(day.date).toLocaleDateString('vi-VN', { weekday: 'short' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkHistory;
