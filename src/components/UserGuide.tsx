
import React, { useState } from 'react';
import { HelpCircle, Timer, CheckSquare, Music, BarChart3, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface UserGuideProps {
  isDarkMode: boolean;
}

const UserGuide: React.FC<UserGuideProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const neumorphicButton = `${
    isDarkMode 
      ? 'bg-slate-800 shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(255,255,255,0.1)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]' 
      : 'bg-gray-100 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]'
  }`;

  const features = [
    {
      icon: Timer,
      title: 'Pomodoro Timer',
      description: 'Kỹ thuật 25 phút làm việc, 5 phút nghỉ giúp tăng hiệu quả tập trung.',
      color: 'text-blue-500'
    },
    {
      icon: CheckSquare,
      title: 'Quản lý Task',
      description: 'Tạo, theo dõi và hoàn thành các nhiệm vụ hàng ngày một cách có tổ chức.',
      color: 'text-green-500'
    },
    {
      icon: Music,
      title: 'Nhạc tập trung',
      description: 'Phát nhạc nền giúp tăng khả năng tập trung và làm việc hiệu quả hơn.',
      color: 'text-purple-500'
    },
    {
      icon: BarChart3,
      title: 'Thống kê',
      description: 'Theo dõi tiến độ và hiệu quả làm việc qua các biểu đồ trực quan.',
      color: 'text-orange-500'
    }
  ];

  const handleViewDetails = () => {
    setIsOpen(false);
    navigate('/user-guide');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className={`p-2 rounded-full transition-all duration-300 ${neumorphicButton}`}>
          <HelpCircle className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-2xl ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700 text-white' 
          : 'bg-white border-gray-200'
      }`}>
        <DialogHeader>
          <DialogTitle className={`text-center text-2xl ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            🌟 Hướng dẫn sử dụng FocusFlow Pro
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
              FocusFlow Pro là ứng dụng tăng hiệu quả làm việc dựa trên phương pháp Pomodoro và các công cụ hỗ trợ tập trung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  isDarkMode 
                    ? 'border-slate-700 bg-slate-700/50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <feature.icon className={`h-6 w-6 mt-1 ${feature.color}`} />
                  <div>
                    <h3 className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`p-4 rounded-lg ${
            isDarkMode 
              ? 'bg-blue-900/30 border border-blue-700' 
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
              💡 Mẹo sử dụng hiệu quả
            </h3>
            <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
              <li>• Bắt đầu với chu kỳ Pomodoro 25 phút</li>
              <li>• Tạo danh sách task trước khi bắt đầu làm việc</li>
              <li>• Sử dụng nhạc nền để tăng khả năng tập trung</li>
              <li>• Theo dõi thống kê để cải thiện hiệu quả</li>
            </ul>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className={isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : ''}
            >
              Đóng
            </Button>
            <Button 
              onClick={handleViewDetails}
              className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              Xem chi tiết
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserGuide;
