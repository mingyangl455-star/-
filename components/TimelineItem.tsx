import React from 'react';
import { Check, Clock, Circle } from 'lucide-react';

interface TimelineItemProps {
  title: string;
  time: string;
  status: 'completed' | 'current' | 'future';
  isLast?: boolean;
  icon?: React.ReactNode;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ title, time, status, isLast, icon }) => {
  let circleColor = 'bg-gray-200 border-gray-200';
  let lineColor = 'border-gray-200';
  let textColor = 'text-gray-500';

  if (status === 'completed') {
    circleColor = 'bg-blue-500 border-blue-500';
    lineColor = 'border-blue-500';
    textColor = 'text-gray-900';
  } else if (status === 'current') {
    circleColor = 'bg-white border-blue-500 border-4';
    lineColor = 'border-gray-200';
    textColor = 'text-blue-600 font-semibold';
  }

  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Vertical Line */}
      {!isLast && (
        <div 
          className={`absolute left-[11px] top-3 bottom-0 w-0.5 border-l-2 ${status === 'completed' ? 'border-blue-500' : 'border-gray-200'}`} 
        />
      )}

      {/* Circle Icon */}
      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 ${circleColor}`}>
        {status === 'completed' ? (
           <Check size={14} className="text-white" />
        ) : status === 'current' ? (
           <div className="w-2 h-2 bg-blue-500 rounded-full" />
        ) : (
           <div className="w-2 h-2 bg-gray-400 rounded-full" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <span className={`text-sm ${textColor}`}>{title}</span>
        {time && <span className="text-xs text-gray-400 mt-1">{time}</span>}
      </div>
    </div>
  );
};
