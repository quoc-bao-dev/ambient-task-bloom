
import React from 'react';
import { ArrowLeft, Timer, CheckSquare, Music, BarChart3, Clock, Settings, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const UserGuideDetail = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'pomodoro',
      title: 'Pomodoro Timer',
      icon: Timer,
      color: 'text-blue-500',
      steps: [
        'Nhấn nút "Bắt đầu" để khởi động chu kỳ 25 phút làm việc',
        'Tập trung hoàn toàn vào nhiệm vụ trong thời gian này',
        'Khi hết thời gian, hệ thống sẽ tự động chuyển sang nghỉ 5 phút',
        'Sau 4 chu kỳ, bạn sẽ được nghỉ dài 15 phút',
        'Sử dụng nút Settings để tùy chỉnh thời gian phù hợp'
      ]
    },
    {
      id: 'tasks',
      title: 'Quản lý Task',
      icon: CheckSquare,
      color: 'text-green-500',
      steps: [
        'Nhấn nút "+" để thêm nhiệm vụ mới',
        'Đặt tên và mô tả chi tiết cho task',
        'Đánh dấu hoàn thành khi kết thúc',
        'Xóa hoặc chỉnh sửa task khi cần thiết',
        'Sắp xếp task theo độ ưu tiên'
      ]
    },
    {
      id: 'music',
      title: 'Nhạc nền tập trung',
      icon: Music,
      color: 'text-purple-500',
      steps: [
        'Chọn bài nhạc phù hợp từ danh sách',
        'Điều chỉnh âm lượng vừa phải',
        'Sử dụng nhạc không lời để tránh mất tập trung',
        'Thay đổi nhạc khi cảm thấy nhàm chán',
        'Tắt nhạc nếu cần yên tĩnh hoàn toàn'
      ]
    },
    {
      id: 'schedule',
      title: 'Hẹn giờ thông minh',
      icon: Clock,
      color: 'text-orange-500',
      steps: [
        'Nhấn nút "+" trong phần Hẹn giờ',
        'Nhập tên công việc và thời gian cụ thể',
        'Thêm mô tả chi tiết nếu cần',
        'Hệ thống sẽ nhắc nhở đúng giờ đã hẹn',
        'Bật/tắt lịch hẹn theo nhu cầu'
      ]
    },
    {
      id: 'history',
      title: 'Thống kê & Lịch sử',
      icon: BarChart3,
      color: 'text-red-500',
      steps: [
        'Xem tổng quan hiệu quả làm việc theo ngày',
        'Theo dõi số chu kỳ Pomodoro đã hoàn thành',
        'Phân tích thời gian tập trung hiệu quả',
        'So sánh tiến độ qua các ngày',
        'Xem chi tiết từng phiên làm việc'
      ]
    }
  ];

  const tips = [
    {
      title: 'Chuẩn bị không gian làm việc',
      content: 'Tạo môi trường yên tĩnh, thoáng mát và ít bị phân tâm.'
    },
    {
      title: 'Lập kế hoạch trước',
      content: 'Xác định rõ mục tiêu và chia nhỏ công việc thành các task cụ thể.'
    },
    {
      title: 'Tắt thông báo',
      content: 'Tắt điện thoại, email và các ứng dụng gây phân tâm trong lúc làm việc.'
    },
    {
      title: 'Nghỉ ngơi đúng cách',
      content: 'Sử dụng thời gian nghỉ để thư giãn, không làm việc hay suy nghĩ về công việc.'
    },
    {
      title: 'Kiên trì và điều chỉnh',
      content: 'Thực hành đều đặn và điều chỉnh thời gian cho phù hợp với bản thân.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-light text-slate-800 dark:text-white">
              Hướng dẫn chi tiết FocusFlow Pro
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Tìm hiểu cách sử dụng hiệu quả mọi tính năng của ứng dụng
            </p>
          </div>
        </div>

        {/* Quick Start */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-300">
            🚀 Bắt đầu nhanh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <span className="text-blue-700 dark:text-blue-300">Tạo danh sách task</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <span className="text-blue-700 dark:text-blue-300">Bắt đầu Pomodoro</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <span className="text-blue-700 dark:text-blue-300">Theo dõi tiến độ</span>
            </div>
          </div>
        </Card>

        {/* Feature Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <Card key={section.id} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <section.icon className={`h-6 w-6 ${section.color}`} />
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {section.title}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3 text-slate-700 dark:text-slate-300">
                    Các bước thực hiện:
                  </h3>
                  <ol className="space-y-2">
                    {section.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className={`w-6 h-6 ${section.color.replace('text-', 'bg-').replace('-500', '-100')} ${section.color} rounded-full flex items-center justify-center text-xs font-bold mt-0.5`}>
                          {index + 1}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div className={`p-4 rounded-lg ${section.color.replace('text-', 'bg-').replace('-500', '-50')} dark:${section.color.replace('text-', 'bg-').replace('-500', '-900/30')}`}>
                  <h3 className={`font-medium mb-2 ${section.color.replace('-500', '-700')} dark:${section.color.replace('-500', '-300')}`}>
                    💡 Mẹo sử dụng
                  </h3>
                  <div className={`text-sm ${section.color.replace('-500', '-600')} dark:${section.color.replace('-500', '-200')}`}>
                    {section.id === 'pomodoro' && (
                      <p>Không bắt buộc phải làm đúng 25 phút. Hãy điều chỉnh thời gian phù hợp với khả năng tập trung của bạn.</p>
                    )}
                    {section.id === 'tasks' && (
                      <p>Chia các task lớn thành nhiều task nhỏ. Mỗi task nên hoàn thành được trong 1-2 chu kỳ Pomodoro.</p>
                    )}
                    {section.id === 'music' && (
                      <p>Nhạc cổ điển, ambient hoặc white noise thường hiệu quả nhất cho việc tập trung.</p>
                    )}
                    {section.id === 'schedule' && (
                      <p>Đặt hẹn giờ cho các hoạt động quan trọng như họp, gọi điện, hoặc nghỉ giải lao.</p>
                    )}
                    {section.id === 'history' && (
                      <p>Theo dõi xu hướng hiệu quả theo thời gian để tìm ra thời điểm làm việc tốt nhất của bạn.</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-white">
            🎯 Bí quyết tăng hiệu quả làm việc
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                <h3 className="font-medium mb-2 text-slate-700 dark:text-slate-300">
                  {tip.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tip.content}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-white">
            ❓ Câu hỏi thường gặp
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tại sao nên sử dụng kỹ thuật Pomodoro?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Kỹ thuật này giúp chia nhỏ công việc, tăng khả năng tập trung và giảm stress. Các nghiên cứu cho thấy làm việc trong khoảng thời gian ngắn với nghỉ giải lao đều đặn sẽ hiệu quả hơn làm việc liên tục trong thời gian dài.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-slate-700 dark:text-slate-300 mb-1">
                Làm thế nào để không bị phân tâm trong lúc làm việc?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Tắt tất cả thông báo không cần thiết, chuẩn bị đầy đủ tài liệu trước khi bắt đầu, và cam kết không làm việc khác trong thời gian Pomodoro.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-medium text-slate-700 dark:text-slate-300 mb-1">
                Có nên sử dụng nhạc khi làm việc?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Tùy thuộc vào loại công việc và sở thích cá nhân. Nhạc không lời thường tốt cho các tác vụ lặp đi lặp lại, trong khi im lặng có thể tốt hơn cho công việc cần suy nghĩ sâu.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserGuideDetail;
