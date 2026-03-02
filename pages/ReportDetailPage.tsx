import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Info, MessageSquareWarning, History, ChevronRight } from 'lucide-react';
import { Report, ReportStatus } from '../types';
import { TimelineItem } from '../components/TimelineItem';
import { formatTime } from '../utils';

interface ReportDetailPageProps {
  reports: Report[];
}

export const ReportDetailPage: React.FC<ReportDetailPageProps> = ({ reports }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = reports.find((r) => r.id === id);

  if (!report) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-gray-500 mb-4">未找到举报记录</p>
          <button onClick={() => navigate('/')} className="text-blue-500 underline">返回</button>
        </div>
      </div>
    );
  }

  const isResolved = report.status === ReportStatus.RESOLVED_PUNISHED || report.status === ReportStatus.RESOLVED_NO_ACTION;
  const isPunished = report.status === ReportStatus.RESOLVED_PUNISHED;

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto shadow-2xl overflow-hidden border-x border-gray-200">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center shadow-sm border-b border-gray-100 z-10 shrink-0 sticky top-0">
        <button 
          onClick={() => navigate('/')}
          className="text-gray-600 hover:bg-gray-100 p-1 rounded-full mr-3"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="font-bold text-lg text-gray-900">举报详情</span>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-0 bg-white">
        {/* Basic Info Section */}
        <div className="p-5 border-b border-gray-100 bg-gray-50">
          <div className="flex items-start gap-4">
             <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden shrink-0">
                <img src={`https://picsum.photos/seed/${report.targetUser.id}/200`} alt="Avatar" className="w-full h-full object-cover" />
             </div>
             <div>
                <p className="font-bold text-gray-900">被举报人: {report.targetUser.name}</p>
                <p className="text-sm text-gray-500 mt-1">举报类型: {report.type}</p>
                <p className="text-sm text-gray-400 mt-0.5">举报ID: {report.id}</p>
             </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">处理进度</h3>
          
          <div className="mb-8">
             {/* 1. Submitted */}
             <TimelineItem 
               title="举报已提交" 
               time={formatTime(report.createdAt)} 
               status="completed" 
             />
             
             {/* 2. Completed / Waiting */}
             <TimelineItem 
               title={isResolved ? (isPunished ? "举报成立" : "已完成") : "等待处理结果"} 
               time={isResolved ? formatTime(report.updatedAt) : ""} 
               status={isResolved ? "completed" : "current"} 
               isLast={true}
             />
          </div>

          {/* Result Card - Only show if resolved */}
          {isResolved && (
            <div className={`rounded-xl p-6 ${isPunished ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100'}`}>
               <div className="flex items-center gap-2 mb-4">
                  {isPunished ? (
                    <ShieldCheck className="text-green-600" size={24} />
                  ) : (
                    <Info className="text-gray-500" size={24} />
                  )}
                  <h2 className={`text-lg font-bold ${isPunished ? 'text-green-800' : 'text-gray-700'}`}>
                    {isPunished ? '举报成立' : '暂未处罚'}
                  </h2>
               </div>

               {isPunished ? (
                 <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                   <p>经核查，该用户确实违反了《HelloTalk社区公约》。我们要么维护社区氛围，系统已执行以下处罚：</p>
                   <ul className="list-none space-y-2 bg-white/50 p-3 rounded-lg">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        已删除违规内容
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        已限制该账号部分社交功能 (7天)
                      </li>
                   </ul>
                   <p className="text-green-700 font-medium text-xs mt-2">感谢您不仅是使用者，更是社区的建设者。</p>
                 </div>
               ) : (
                 <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                   <p>经核查，您提交的证据暂时未达到违规处罚标准。但这并不代表我们认可该行为。</p>
                   <ul className="list-none space-y-2 bg-white/50 p-3 rounded-lg">
                      <li className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                         系统已将该用户加入重点关注名单
                      </li>
                      <li className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                         建议您使用“屏蔽”功能，不再接收对方消息
                      </li>
                   </ul>
                   <div className="flex items-start gap-2 text-xs text-gray-500 mt-2 bg-yellow-50 p-2 rounded border border-yellow-100">
                      <MessageSquareWarning size={14} className="shrink-0 mt-0.5 text-yellow-600" />
                      如对方有进一步恶劣行为，请补充证据再次举报。
                   </div>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* History Entry Point */}
        <div className="px-6 pb-6">
          <button 
             onClick={() => navigate('/history')}
             className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors group"
          >
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 group-hover:text-blue-500 transition-colors">
                  <History size={16} />
               </div>
               <span className="text-sm font-bold text-gray-700">历史举报记录</span>
             </div>
             <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>

      </main>
    </div>
  );
};