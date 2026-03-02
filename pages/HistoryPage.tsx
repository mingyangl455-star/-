import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, History, ChevronRight } from 'lucide-react';
import { Report, ReportStatus } from '../types';
import { formatTime } from '../utils';

interface HistoryPageProps {
  reports: Report[];
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ reports }) => {
  const navigate = useNavigate();

  // Sort by newest first
  const historyReports = [...reports].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto shadow-xl overflow-hidden border-x border-gray-200">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm border-b border-gray-100 z-10 shrink-0 sticky top-0">
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:bg-gray-100 p-1 rounded-full mr-3"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="font-bold text-lg text-gray-900">历史举报记录</span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        {historyReports.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-64 text-gray-400">
             <History size={48} className="mb-2 opacity-20" />
             <p>暂无历史记录</p>
           </div>
        ) : (
          historyReports.map(report => (
            <div 
              key={report.id} 
              onClick={() => navigate(`/report/${report.id}`)}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform hover:shadow-md"
            >
               <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-gray-800 text-sm truncate pr-2">{report.type}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${
                      report.status === ReportStatus.RESOLVED_PUNISHED ? 'bg-green-50 text-green-600 border border-green-100' :
                      report.status === ReportStatus.RESOLVED_NO_ACTION ? 'bg-gray-100 text-gray-500 border border-gray-200' :
                      'bg-blue-50 text-blue-600 border border-blue-100'
                   }`}>
                      {report.status === ReportStatus.RESOLVED_PUNISHED ? '已处罚' :
                       report.status === ReportStatus.RESOLVED_NO_ACTION ? '未处罚' :
                       '处理中'}
                   </span>
               </div>
               <div className="flex justify-between items-end">
                 <div>
                    <div className="text-sm text-gray-600 mb-1">被举报人：{report.targetUser.name}</div>
                    <div className="text-xs text-gray-400">{formatTime(report.createdAt)}</div>
                 </div>
                 <ChevronRight size={16} className="text-gray-300 mb-0.5" />
               </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};