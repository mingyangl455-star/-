import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ChatPage } from './pages/ChatPage';
import { ReportDetailPage } from './pages/ReportDetailPage';
import { HistoryPage } from './pages/HistoryPage';
import { Report, ReportType, ReportStatus, User } from './types';
import { generateId } from './utils';

// Predefined mock users
const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alice_Wonder', avatar: '', reportCount: 0 },
  { id: 'u2', name: 'Bob_Builder', avatar: '', reportCount: 4 }, // Close to ban
  { id: 'u3', name: 'Spam_Bot_9000', avatar: '', reportCount: 6 }, // Already high
];

const App: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  // Function to create a new simulation report
  const simulateNewReport = () => {
    // Pick a random user
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const targetUser = users[randomUserIndex];
    
    // Pick a random report type
    const types = Object.values(ReportType);
    const randomType = types[Math.floor(Math.random() * types.length)];

    const newReport: Report = {
      id: generateId(),
      targetUser: { ...targetUser }, // Snapshot of user at this time
      type: randomType,
      reason: 'Harassment or Spam',
      status: ReportStatus.PENDING,
      timeline: [
        {
          status: ReportStatus.PENDING,
          timestamp: Date.now(),
          description: 'Report Submitted'
        }
      ],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setReports(prev => [...prev, newReport]);

    // Simulate system processing delay (10 seconds for demo purposes)
    setTimeout(() => {
      resolveReport(newReport.id, targetUser.id);
    }, 10000);
  };

  const resolveReport = (reportId: string, userId: string) => {
    setUsers(prevUsers => {
      // Find current user state
      const userIndex = prevUsers.findIndex(u => u.id === userId);
      if (userIndex === -1) return prevUsers;

      const user = prevUsers[userIndex];
      const newReportCount = user.reportCount + 1;
      
      // Auto-ban logic: If reports > 5, Punish. Else, random chance.
      // Logic: > 5 reports = 100% punish. <= 5 reports = 50% punish.
      const shouldPunish = newReportCount > 5 || Math.random() > 0.5;

      const finalStatus = shouldPunish 
        ? ReportStatus.RESOLVED_PUNISHED 
        : ReportStatus.RESOLVED_NO_ACTION;

      // Update Report
      setReports(prevReports => prevReports.map(r => {
        if (r.id === reportId) {
          return {
            ...r,
            status: finalStatus,
            updatedAt: Date.now(), // Simulating time passed
            timeline: [
              ...r.timeline,
              { status: ReportStatus.INVESTIGATING, timestamp: Date.now() - 5000, description: 'Under Review' },
              { status: finalStatus, timestamp: Date.now(), description: 'Resolved' }
            ]
          };
        }
        return r;
      }));

      // Update User count
      const updatedUsers = [...prevUsers];
      updatedUsers[userIndex] = { ...user, reportCount: newReportCount };
      return updatedUsers;
    });
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/" 
          element={<ChatPage reports={reports} onSimulateReport={simulateNewReport} />} 
        />
        <Route 
          path="/report/:id" 
          element={<ReportDetailPage reports={reports} />} 
        />
        <Route 
          path="/history" 
          element={<HistoryPage reports={reports} />} 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;