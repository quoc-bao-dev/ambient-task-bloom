
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings, Minus, Plus } from 'lucide-react';

interface PomodoroSettingsProps {
  isDarkMode: boolean;
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  onSave: (settings: {
    workDuration: number;
    breakDuration: number;
    longBreakDuration: number;
  }) => void;
}

const PomodoroSettings: React.FC<PomodoroSettingsProps> = ({
  isDarkMode,
  workDuration,
  breakDuration,
  longBreakDuration,
  onSave,
}) => {
  const [work, setWork] = useState(Math.floor(workDuration / 60));
  const [shortBreak, setShortBreak] = useState(Math.floor(breakDuration / 60));
  const [longBreak, setLongBreak] = useState(Math.floor(longBreakDuration / 60));
  const [open, setOpen] = useState(false);

  const neumorphicButton = `${
    isDarkMode 
      ? 'bg-slate-800 shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(255,255,255,0.1)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]' 
      : 'bg-gray-100 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]'
  }`;

  const handleSave = () => {
    onSave({
      workDuration: work * 60,
      breakDuration: shortBreak * 60,
      longBreakDuration: longBreak * 60,
    });
    setOpen(false);
  };

  const SettingItem = ({ 
    label, 
    value, 
    setValue, 
    min = 1, 
    max = 60 
  }: { 
    label: string; 
    value: number; 
    setValue: (value: number) => void;
    min?: number;
    max?: number;
  }) => (
    <div className="flex items-center justify-between py-3">
      <label className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
        {label}
      </label>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setValue(Math.max(min, value - 1))}
          className={`p-1 rounded-full transition-all duration-200 ${neumorphicButton}`}
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className={`w-12 text-center font-mono ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
          {value}m
        </span>
        <button
          onClick={() => setValue(Math.min(max, value + 1))}
          className={`p-1 rounded-full transition-all duration-200 ${neumorphicButton}`}
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={`p-2 rounded-full transition-all duration-300 ${neumorphicButton}`}>
          <Settings className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-md ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700 text-white' 
          : 'bg-white border-gray-200'
      }`}>
        <DialogHeader>
          <DialogTitle className={isDarkMode ? 'text-white' : 'text-slate-800'}>
            Cài đặt Pomodoro
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-1">
          <SettingItem 
            label="Thời gian làm việc" 
            value={work} 
            setValue={setWork}
            min={5}
            max={60}
          />
          <SettingItem 
            label="Nghỉ ngắn" 
            value={shortBreak} 
            setValue={setShortBreak}
            min={1}
            max={30}
          />
          <SettingItem 
            label="Nghỉ dài" 
            value={longBreak} 
            setValue={setLongBreak}
            min={5}
            max={60}
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            className={isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : ''}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleSave}
            className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          >
            Lưu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PomodoroSettings;
