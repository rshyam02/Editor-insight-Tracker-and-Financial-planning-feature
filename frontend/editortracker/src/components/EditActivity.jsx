import React from 'react';

const EditActivity = ({ recentActivity, tasks }) => {
  return (
    <div className="panel">
      <h2>Recent Activity</h2>
      <table>
        <thead>
          <tr><th>File</th><th>Timestamp</th><th>Action</th><th>Matched Task</th></tr>
        </thead>
        <tbody>
          {recentActivity.map((activity, index) => {
            const task = tasks.find(t => t.relatedFiles?.includes(activity.file));
            return (
              <tr key={index}>
                <td>{activity.file}</td>
                <td>{new Date(activity.timestamp).toLocaleString()}</td>
                <td>{activity.action}</td>
                <td>{task ? task.name : 'No match'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EditActivity;