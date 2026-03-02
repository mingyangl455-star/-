import React from 'react';
import { ChevronRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Report, ReportStatus } from '../types';

interface ReportCardProps {
  report: Report;
  onClick: () => void;
  variant: 'received' | 'resolved'; // Determine which stage to show
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onClick, variant }) => {
  
  const isResolved = variant === 'resolved';
  
  // Dynamic Content based on variant
  const title = isResolved 
    ? "举报处理完成" 
    : "举报已受理";
    
  const Icon = isResolved ? CheckCircle2 : ShieldAlert;
  const iconColor = isResolved ? "text-green-500" : "text-blue-500";
  
  const bodyText = isResolved
    ? `关于您举报用户 ${report.targetUser.name} 的处理结果已更新。`
    : `感谢您的反馈。我们已收到您对用户 ${report.targetUser.name} 的举报，官方会尽快核实。`;

  // Only show status label for resolved reports
  // We removed the "Currently: Queued..." status for received reports to avoid "real-time" implication
  const statusLabel = isResolved
    ? (report.status === ReportStatus.RESOLVED_PUNISHED ? "最终结论：✅ 举报成立，已处罚" : "最终结论：ℹ️ 暂未处罚")
    : null;

  // Unified action text
  const actionText = "查看详情";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-sm w-full mx-auto my-4 animate-fade-in-up">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-2">
        <Icon size={20} className={iconColor} />
        <span className="font-bold text-gray-800">{title}</span>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
          {bodyText}
        </p>
        
        {!isResolved && (
           <div className="text-sm text-gray-500 mb-3">
             <span className="block">举报类型：{report.type}</span>
           </div>
        )}

        {statusLabel && (
          <div className={`text-sm ${isResolved && report.status === ReportStatus.RESOLVED_PUNISHED ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
            {statusLabel}
          </div>
        )}
      </div>

      {/* Footer / Action */}
      <div 
        onClick={onClick}
        className="px-4 py-3 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <span className="text-sm text-blue-500 font-medium">{actionText}</span>
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </div>
  );
};