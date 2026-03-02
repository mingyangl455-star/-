export enum ReportType {
  LIVE_COMMENT = '直播评论举报',
  LIVE_ROOM = '直播间举报',
  VOICE_CHAT_COMMENT = '语聊评论举报',
  VOICE_CHAT_USER = '语聊用户举报',
  TOPIC = '话题举报',
  FEED_COMMENT = '信息流评论举报',
  FEED_POST = '信息流帖子举报',
  REPORT_NEW = '举报NEW',
  SENSITIVE_WORD = '敏感词举报',
  GROUP_SENSITIVE_WORD = '群敏感词举报',
}

export enum ReportStatus {
  PENDING = 'PENDING',       // Waiting for review
  INVESTIGATING = 'INVESTIGATING', // Under review
  RESOLVED_PUNISHED = 'RESOLVED_PUNISHED', // Violation confirmed
  RESOLVED_NO_ACTION = 'RESOLVED_NO_ACTION', // Insufficient evidence
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  reportCount: number; // To track the >5 auto-ban rule
}

export interface ReportEvent {
  status: ReportStatus;
  timestamp: number;
  description: string;
}

export interface Report {
  id: string;
  targetUser: User;
  type: ReportType;
  reason: string; // e.g., "Harassment", "Spam"
  status: ReportStatus;
  timeline: ReportEvent[];
  createdAt: number;
  updatedAt: number;
}
