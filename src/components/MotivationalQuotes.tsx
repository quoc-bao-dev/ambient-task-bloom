
import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

interface MotivationalQuotesProps {
  isDarkMode: boolean;
}

const QUOTES = [
  {
    text: "Thành công không phải là chìa khóa để hạnh phúc. Hạnh phúc là chìa khóa để thành công.",
    author: "Albert Schweitzer"
  },
  {
    text: "Cách duy nhất để làm công việc tuyệt vời là yêu thích những gì bạn làm.",
    author: "Steve Jobs"
  },
  {
    text: "Đừng xem đồng hồ; hãy làm những gì nó làm. Tiếp tục đi.",
    author: "Sam Levenson"
  },
  {
    text: "Tương lai thuộc về những ai tin vào vẻ đẹp của ước mơ.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Điều khó khăn nhất là quyết định hành động, phần còn lại chỉ là kiên trì.",
    author: "Amelia Earhart"
  },
  {
    text: "Đó là trong những lúc khó khăn nhất mà ta phát hiện ra sức mạnh thực sự của mình.",
    author: "Unknown"
  },
  {
    text: "Tập trung vào việc cải thiện bản thân, không phải chứng minh bản thân.",
    author: "Unknown"
  },
  {
    text: "Một phút tập trung tốt hơn một giờ mơ mộng.",
    author: "Unknown"
  }
];

const MotivationalQuotes: React.FC<MotivationalQuotesProps> = ({ isDarkMode }) => {
  const [currentQuote, setCurrentQuote] = useState<typeof QUOTES[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    const showQuote = () => {
      const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      setCurrentQuote(randomQuote);
      setIsVisible(true);
      setAnimationClass('animate-fade-in animate-scale-in');

      // Auto hide after 10 seconds
      setTimeout(() => {
        handleClose();
      }, 10000);
    };

    // Show first quote after 30 seconds
    const firstTimer = setTimeout(showQuote, 30000);

    // Then show every 5-10 minutes randomly
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 300000 + 300000; // 5-10 minutes
      setTimeout(showQuote, randomDelay);
    }, 600000); // Check every 10 minutes

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setAnimationClass('animate-fade-out animate-scale-out');
    setTimeout(() => {
      setIsVisible(false);
      setCurrentQuote(null);
    }, 300);
  };

  if (!isVisible || !currentQuote) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        className={`
          max-w-md mx-4 p-8 rounded-3xl border-0 relative overflow-hidden
          ${isDarkMode 
            ? 'bg-slate-800 shadow-[2px_2px_15px_rgba(0,0,0,0.5),-2px_-2px_15px_rgba(255,255,255,0.1)] text-white' 
            : 'bg-white shadow-[2px_2px_15px_rgba(0,0,0,0.1),-2px_-2px_15px_rgba(255,255,255,0.9)] text-slate-800'
          }
          ${animationClass}
          transition-all duration-300
        `}
      >
        {/* Background decoration */}
        <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-xl opacity-30 ${
          isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
        }`} />
        <div className={`absolute bottom-0 left-0 w-16 h-16 rounded-full blur-xl opacity-20 ${
          isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
        }`} />

        {/* Close button */}
        <button
          onClick={handleClose}
          className={`
            absolute top-4 right-4 p-2 rounded-full transition-all duration-200
            ${isDarkMode 
              ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
              : 'hover:bg-gray-100 text-slate-500 hover:text-slate-700'
            }
          `}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`
            p-4 rounded-full
            ${isDarkMode 
              ? 'bg-slate-700 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]' 
              : 'bg-gray-100 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]'
            }
          `}>
            <Sparkles className={`h-8 w-8 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} animate-pulse`} />
          </div>
        </div>

        {/* Quote */}
        <div className="text-center space-y-4">
          <blockquote className="text-lg font-light leading-relaxed italic">
            "{currentQuote.text}"
          </blockquote>
          <cite className={`block text-sm font-medium ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            — {currentQuote.author}
          </cite>
        </div>

        {/* Bottom decoration */}
        <div className={`mt-6 h-1 rounded-full mx-auto w-16 ${
          isDarkMode ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-blue-500 to-purple-500'
        }`} />
      </div>
    </div>
  );
};

export default MotivationalQuotes;
