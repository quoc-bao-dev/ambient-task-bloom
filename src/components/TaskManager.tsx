
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Focus, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskManagerProps {
  isDarkMode: boolean;
}

const TaskManager: React.FC<TaskManagerProps> = ({ isDarkMode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [focusedTaskId, setFocusedTaskId] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const { toast } = useToast();

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('focus-app-tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }));
      setTasks(parsedTasks);
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('focus-app-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTasks([task, ...tasks]);
      setNewTask('');
      toast({
        title: "✨ Đã thêm task mới",
        description: "Bắt đầu tập trung vào mục tiêu của bạn!",
      });
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        if (updatedTask.completed) {
          toast({
            title: "🎉 Hoàn thành xuất sắc!",
            description: "Bạn đã hoàn thành một task. Tiếp tục phát huy!",
          });
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (focusedTaskId === id) {
      setFocusedTaskId(null);
    }
  };

  const focusOnTask = (id: string) => {
    setFocusedTaskId(focusedTaskId === id ? null : id);
    toast({
      title: focusedTaskId === id ? "🌿 Đã thoát chế độ tập trung" : "🎯 Chế độ tập trung",
      description: focusedTaskId === id ? "Hiển thị tất cả tasks" : "Tập trung vào task này",
    });
  };

  const filteredTasks = tasks.filter(task => {
    if (focusedTaskId && task.id !== focusedTaskId) return false;
    if (!showCompleted && task.completed) return false;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light flex items-center gap-2">
          🌱 Công việc hôm nay
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCompleted(!showCompleted)}
            className={`${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-green-100'}`}
          >
            {showCompleted ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {showCompleted ? 'Ẩn hoàn thành' : 'Hiện hoàn thành'}
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Tiến độ</span>
            <span>{completedCount}/{totalCount} ({Math.round(progress)}%)</span>
          </div>
          <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div 
              className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Add Task */}
      <div className="flex gap-2">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Thêm công việc mới..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          className={`flex-1 border-0 ${
            isDarkMode 
              ? 'bg-slate-700/50 text-white placeholder:text-slate-400' 
              : 'bg-white/50 text-slate-800 placeholder:text-slate-500'
          }`}
        />
        <Button 
          onClick={addTask}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Task List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-4 rounded-lg transition-all ${
              task.id === focusedTaskId
                ? isDarkMode 
                  ? 'bg-blue-900/30 border border-blue-500/30' 
                  : 'bg-blue-100/50 border border-blue-300/50'
                : isDarkMode
                  ? 'bg-slate-700/30 hover:bg-slate-700/50'
                  : 'bg-white/30 hover:bg-white/50'
            }`}
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            />
            <span
              className={`flex-1 ${
                task.completed 
                  ? isDarkMode ? 'line-through text-slate-400' : 'line-through text-slate-500'
                  : ''
              }`}
            >
              {task.text}
            </span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => focusOnTask(task.id)}
                className={`p-2 ${
                  task.id === focusedTaskId
                    ? 'bg-blue-500/20 text-blue-400'
                    : isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'
                }`}
              >
                <Focus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTask(task.id)}
                className={`p-2 text-red-400 ${isDarkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-100'}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🌸</div>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {tasks.length === 0 ? 'Chưa có công việc nào. Hãy thêm task đầu tiên!' : 'Không có task nào để hiển thị'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
