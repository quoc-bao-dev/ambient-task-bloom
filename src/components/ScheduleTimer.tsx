
import React, { useState, useEffect } from 'react';
import { Clock, Bell, Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ScheduledTask {
  id: string;
  title: string;
  time: string;
  description: string;
  isActive: boolean;
}

interface ScheduleTimerProps {
  isDarkMode: boolean;
}

const ScheduleTimer: React.FC<ScheduleTimerProps> = ({ isDarkMode }) => {
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alertTask, setAlertTask] = useState<ScheduledTask | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    time: '',
    description: '',
  });
  const { toast } = useToast();

  const neumorphicButton = `${
    isDarkMode 
      ? 'bg-slate-800 shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(255,255,255,0.1)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]' 
      : 'bg-gray-100 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]'
  }`;

  const neumorphicCard = `${
    isDarkMode 
      ? 'bg-slate-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]' 
      : 'bg-gray-100 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]'
  }`;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);

      tasks.forEach(task => {
        if (task.isActive && task.time === currentTime) {
          setAlertTask(task);
          // Deactivate the task after triggering
          setTasks(prev => prev.map(t => 
            t.id === task.id ? { ...t, isActive: false } : t
          ));
          
          toast({
            title: "⏰ Đến giờ rồi!",
            description: `Nhiệm vụ: ${task.title}`,
          });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks, toast]);

  const addTask = () => {
    if (!newTask.title || !newTask.time) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ tiêu đề và thời gian",
        variant: "destructive",
      });
      return;
    }

    const task: ScheduledTask = {
      id: Date.now().toString(),
      title: newTask.title,
      time: newTask.time,
      description: newTask.description,
      isActive: true,
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', time: '', description: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "✅ Đã tạo lịch hẹn",
      description: `Sẽ nhắc nhở bạn lúc ${newTask.time}`,
    });
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isActive: !task.isActive } : task
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className={`h-6 w-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          <h3 className="text-xl font-light">Hẹn giờ</h3>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className={`p-2 rounded-full transition-all duration-300 ${neumorphicButton}`}>
              <Plus className="h-4 w-4" />
            </button>
          </DialogTrigger>
          <DialogContent className={`sm:max-w-md ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 text-white' 
              : 'bg-white border-gray-200'
          }`}>
            <DialogHeader>
              <DialogTitle className={isDarkMode ? 'text-white' : 'text-slate-800'}>
                Tạo lịch hẹn mới
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                  Tiêu đề *
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                  placeholder="Tên công việc..."
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                  Thời gian *
                </label>
                <input
                  type="time"
                  value={newTask.time}
                  onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                  Mô tả
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                  placeholder="Chi tiết công việc..."
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className={isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : ''}
              >
                Hủy
              </Button>
              <Button 
                onClick={addTask}
                className={`${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
              >
                Tạo hẹn
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Task List */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className={`text-center py-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Chưa có lịch hẹn nào</p>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className={`p-3 rounded-lg ${neumorphicCard}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-medium ${task.isActive ? '' : 'opacity-50'}`}>
                      {task.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {task.isActive ? 'Hoạt động' : 'Đã dừng'}
                    </span>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} ${task.isActive ? '' : 'opacity-50'}`}>
                    {task.time} • {task.description || 'Không có mô tả'}
                  </p>
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`p-1 rounded transition-all duration-200 ${neumorphicButton}`}
                  >
                    <Bell className={`h-3 w-3 ${task.isActive ? 'text-green-500' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className={`p-1 rounded transition-all duration-200 ${neumorphicButton}`}
                  >
                    <Trash2 className="h-3 w-3 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={!!alertTask} onOpenChange={() => setAlertTask(null)}>
        <AlertDialogContent className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
          <AlertDialogHeader>
            <AlertDialogTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : ''}`}>
              <Bell className="h-5 w-5 text-orange-500" />
              Đã đến giờ!
            </AlertDialogTitle>
            <AlertDialogDescription className={isDarkMode ? 'text-slate-300' : ''}>
              <div className="space-y-2">
                <p className="font-medium">{alertTask?.title}</p>
                <p className="text-sm">{alertTask?.description || 'Không có mô tả chi tiết'}</p>
                <p className="text-xs opacity-75">Thời gian: {alertTask?.time}</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setAlertTask(null)}
              className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              Đã hiểu
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ScheduleTimer;
