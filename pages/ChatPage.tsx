import React, { useRef, useEffect } from 'react';
import { ArrowLeft, MoreHorizontal, MessageSquarePlus } from 'lucide-react';
import { ReportCard } from '../components/ReportCard';
import { Report, ReportStatus } from '../types';
import { formatTime } from '../utils';
import { useNavigate } from 'react-router-dom';

interface ChatPageProps {
  reports: Report[];
  onSimulateReport: () => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ reports, onSimulateReport }) => {
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when reports change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [reports]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-gray-200">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button className="text-gray-600 hover:bg-gray-100 p-1 rounded-full">
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-gray-900">HelloTalk Team</span>
            <span className="text-xs text-gray-400">官方系统号</span>
          </div>
        </div>
        <button className="text-gray-600">
          <MoreHorizontal size={24} />
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
        {reports.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            <p>暂无系统通知</p>
            <p className="text-sm mt-2">点击下方按钮模拟新的举报</p>
          </div>
        )}

        {reports.map((report) => (
          <div key={report.id}>
             {/* Time Separator - Simplification: Showing timestamp for "Received" */}
             <div className="flex justify-center mb-2">
                <span className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded">
                  {formatTime(report.createdAt)}
                </span>
             </div>

             {/* 1. The "Received" Card */}
             <ReportCard 
                report={report} 
                variant="received" 
                onClick={() => navigate(`/report/${report.id}`)} 
             />

             {/* 2. The "Resolved" Card (If resolved) */}
             {(report.status === ReportStatus.RESOLVED_PUNISHED || report.status === ReportStatus.RESOLVED_NO_ACTION) && (
               <>
                  <div className="flex justify-center mb-2 mt-6">
                    <span className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded">
                      {formatTime(report.updatedAt)}
                    </span>
                  </div>
                  <ReportCard 
                    report={report} 
                    variant="resolved" 
                    onClick={() => navigate(`/report/${report.id}`)} 
                  />
               </>
             )}
          </div>
        ))}
        <div ref={bottomRef} />
      </main>

      {/* Debug/Simulation Footer */}
      <footer className="bg-white p-3 border-t border-gray-200 shrink-0">
        <button 
          onClick={onSimulateReport}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors active:scale-95"
        >
          <MessageSquarePlus size={20} />
          <span>模拟：提交新举报</span>
        </button>
        <p className="text-xs text-center text-gray-400 mt-2">
          (这是一个演示界面，点击按钮生成随机举报流程)
        </p>
      </footer>
    </div>
  );
};
