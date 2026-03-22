# Editor Insights Tracker

A full-stack application for tracking editor activity and mapping it to predefined tasks.

## Features

- Tracks current active file
- Detects active task based on file mappings
- Displays edit activity summary
- Shows task status insights
- Insights panel with key metrics
- Task mapping display
- Recent edit activity table
- Handles edge cases: no matches, multiple matches, empty data

## Architecture

- **Backend**: Node.js with Express.js API
- **Frontend**: React with Vite
- **Data**: Mock data for demonstration

## Task Mapping Logic

Files are mapped to tasks using exact string comparison with predefined related files. If a file matches multiple tasks, all possible tasks are displayed. If no match, it's marked as "No Matching Task".

## Handling Ambiguity

- **Multiple matches**: Displays all possible tasks in the active task field.
- **No matches**: Clearly indicates "No Matching Task" or "None".
- **Empty data**: UI handles missing data gracefully (e.g., "Never" for last edited if no edits).

## Installation

1. Backend: `cd backend && npm install && npm start`
2. Frontend: `cd frontend/editortracker && npm install && npm run dev`

## Running

- Backend API: http://localhost:3001
- Frontend: http://localhost:5174 (or assigned port)

## Approach

- Separated concerns: backend for logic, frontend for UI
- Modular code structure with controllers, routes, models
- Error handling in API endpoints
- Responsive UI with tables and forms