// Mock data for tasks and edit events
const tasks = [
  { id: 1, name: 'Implement login feature', relatedFiles: ['src/auth/login.js', 'src/auth/utils.js'] },
  { id: 2, name: 'Fix bug in dashboard', relatedFiles: ['src/dashboard/main.js', 'src/components/chart.js'] },
  { id: 3, name: 'Add user profile page', relatedFiles: ['src/profile/index.js'] },
  { id: 4, name: 'Shared config update', relatedFiles: ['config/app.js', 'src/auth/login.js'] } // for multiple match example
];

const editEvents = [
  { file: 'src/auth/login.js', timestamp: '2026-03-22T10:00:00Z', linesAdded: 10, linesRemoved: 5 },
  { file: 'src/auth/login.js', timestamp: '2026-03-22T11:00:00Z', linesAdded: 5, linesRemoved: 2 },
  { file: 'src/dashboard/main.js', timestamp: '2026-03-22T12:00:00Z', linesAdded: 20, linesRemoved: 10 },
  { file: 'src/profile/index.js', timestamp: '2026-03-22T13:00:00Z', linesAdded: 15, linesRemoved: 3 },
  { file: 'unknown/file.js', timestamp: '2026-03-22T14:00:00Z', linesAdded: 5, linesRemoved: 1 } // no match
];

let currentActiveFile = 'src/auth/login.js';

// Recent activity: tracks last 5 accessed files with timestamps
// Initialize from edit events (most recent first)
let recentActivity = [
  { file: 'unknown/file.js', timestamp: '2026-03-22T14:00:00Z', action: 'accessed' },
  { file: 'src/profile/index.js', timestamp: '2026-03-22T13:00:00Z', action: 'accessed' },
  { file: 'src/dashboard/main.js', timestamp: '2026-03-22T12:00:00Z', action: 'accessed' },
  { file: 'src/auth/login.js', timestamp: '2026-03-22T11:00:00Z', action: 'accessed' }
];

module.exports = { tasks, editEvents, currentActiveFile, recentActivity };