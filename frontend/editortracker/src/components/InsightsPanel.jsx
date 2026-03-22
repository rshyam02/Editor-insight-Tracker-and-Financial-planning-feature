import React from 'react';

const InsightsPanel = ({ insights }) => {
  return (
    <div className="panel">
      <h2>Insights Panel</h2>
      <p><strong>Active File:</strong> {insights.activeFile || 'None'}</p>
      <p><strong>Active Task:</strong> {insights.activeTask || 'None'}</p>
      <p><strong>Last Edited:</strong> {insights.lastEdited ? new Date(insights.lastEdited).toLocaleString() : 'Never'}</p>
      <p><strong>Number of Edit Events:</strong> {insights.numberOfEditEvents || 0}</p>
      <p><strong>Total Lines Changed:</strong> {insights.totalLinesChanged || 0}</p>
      <p><strong>Status:</strong> {insights.status || 'Unknown'}</p>
    </div>
  );
};

export default InsightsPanel;