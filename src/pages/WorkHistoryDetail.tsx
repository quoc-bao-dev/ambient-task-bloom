
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, TrendingUp, Clock, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWorkHistory } from '@/hooks/useWorkHistory';

const WorkHistoryDetail = () => {
  const navigate = useNavigate();
  const { getRecentStats, sessions } = useWorkHistory();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const hours = new Date().getHours();
    return hours < 7 || hours > 19;
  });

  const stats30Days = getRecentStats(30);
  const stats7Days = getRecentStats(7);

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

  const total30Days = stats30Days.reduce((total, day) => total + day.totalWorkTime, 0);
  const total7Days = stats7Days.reduce((total, day) => total + day.totalWorkTime, 0);
  const avgFocusScore = stats30Days.reduce((total, day) => total + day.focusScore, 0) / 30;
  const bestDay = stats30Days.reduce((best, day) => 
    day.totalWorkTime > best.totalWorkTime ? day : best
  );

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode ? 'bg-slate-900' : 'bg-gray-100'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="sm"
            className={`transition-all duration-300 ${neumorphicButton}`}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className={`text-3xl font-light ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            Chi tiết lịch sử làm việc
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-3xl ${neumorphicCard} ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Clock className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className="text-sm font-medium">30 ngày</span>
            </div>
            <div className="text-2xl font-bold">{formatTime(total30Days)}</div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Tổng thời gian
            </div>
          </div>

          <div className={`p-6 rounded-3xl ${neumorphicCard} ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className={`h-6 w-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <span className="text-sm font-medium">7 ngày</span>
            </div>
            <div className="text-2xl font-bold">{formatTime(total7Days)}</div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Tuần này
            </div>
          </div>

          <div className={`p-6 rounded-3xl ${neumorphicCard} ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Target className={`h-6 w-6 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <span className="text-sm font-medium">Điểm tập trung</span>
            </div>
            <div className="text-2xl font-bold">{Math.round(avgFocusScore)}%</div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Trung bình 30 ngày
            </div>
          </div>

          <div className={`p-6 rounded-3xl ${neumorphicCard} ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Award className={`h-6 w-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <span className="text-sm font-medium">Ngày tốt nhất</span>
            </div>
            <div className="text-2xl font-bold">{formatTime(bestDay.totalWorkTime)}</div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {new Date(bestDay.date).toLocaleDateString('vi-VN')}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className={`p-6 rounded-3xl ${neumorphicCard} ${isDarkMode ? 'text-white' : 'text-slate-800'} mb-8`}>
          <div className="flex items-center gap-3 mb-6">
            <Calendar className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className="text-xl font-light">Biểu đồ 30 ngày</h3>
          </div>
          <div className="flex items-end justify-between gap-1 h-40">
            {stats30Days.map((day, index) => (
              <div key={index} className="flex flex-col items-center justify-end h-full">
                <div 
                  className={`w-6 rounded-t-sm transition-all duration-300 ${
                    day.totalWorkTime > 0 
                      ? isDarkMode ? 'bg-blue-500 hover:bg-blue-400' : 'bg-blue-600 hover:bg-blue-500'
                      : isDarkMode ? 'bg-slate-700' : 'bg-gray-300'
                  }`}
                  style={{
                    height: `${Math.max(4, (day.totalWorkTime / Math.max(...stats30Days.map(d => d.totalWorkTime), 1)) * 120)}px`
                  }}
                  title={`${new Date(day.date).toLocaleDateString('vi-VN')}: ${formatTime(day.totalWorkTime)}`}
                />
                {index % 5 === 0 && (
                  <span className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {new Date(day.date).getDate()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className={`p-6 rounded-3xl ${neumorphicCard} ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          <h3 className="text-xl font-light mb-4">Phiên gần đây</h3>
          <div className="space-y-3">
            {sessions
              .slice(-10)
              .reverse()
              .map((session) => (
                <div key={session.id} className={`p-3 rounded-xl ${
                  isDarkMode ? 'bg-slate-700' : 'bg-white'
                } flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      session.completed 
                        ? isDarkMode ? 'bg-green-400' : 'bg-green-500'
                        : isDarkMode ? 'bg-red-400' : 'bg-red-500'
                    }`} />
                    <div>
                      <div className="font-medium">
                        {session.type === 'work' ? 'Làm việc' : 'Nghỉ ngơi'}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {new Date(session.timestamp).toLocaleDateString('vi-VN')} {' '}
                        {new Date(session.timestamp).toLocaleTimeString('vi-VN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatTime(session.duration)}</div>
                    <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {session.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHistoryDetail;
