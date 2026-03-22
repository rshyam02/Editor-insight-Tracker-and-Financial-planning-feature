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



# Financial Planning Feature

A financial analytics module designed to provide insights into revenue, profit, and future financial projections.

## Features

- Monthly revenue tracking
- Annual Recurring Revenue (ARR) calculation
- Profit analysis
- Financial runway estimation
- Revenue forecasting (12-month projection)
- Growth trend visualization
- Clean dashboard for financial insights

## Metrics Covered

- **ARR (Annual Recurring Revenue)**  
  Calculates yearly revenue based on monthly earnings.

- **Monthly Profit**  
  Tracks net profit generated per month.

- **Runway**  
  Estimates how long the business can sustain operations.

- **Revenue Forecast**  
  Predicts future revenue using growth assumptions.

## Forecast Logic

Revenue is projected using a consistent growth rate applied month-over-month:

- Each month increases by a fixed percentage
- Compounding growth model
- Helps simulate future scalability

## Architecture

- **Backend**: Node.js with Express.js
- **Frontend**: React (Vite)
- **Data Source**: Mock financial dataset

## Data Example

| Month | Revenue ($) |
|------|------------|
| 1    | 300,000    |
| 2    | 315,000    |
| 3    | 330,750    |

## Installation

1. Backend:
   ```bash
   cd backend
   npm install
   npm start

## Approach

- Separated concerns: backend for logic, frontend for UI
- Modular code structure with controllers, routes, models
- Error handling in API endpoints
- Responsive UI with tables and forms
