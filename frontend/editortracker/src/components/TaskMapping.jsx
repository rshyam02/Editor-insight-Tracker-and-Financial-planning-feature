import React from 'react';

const TaskMapping = ({ tasks, activeTask }) => {
  return (
    <div className="panel">
      <h2>Task Mapping</h2>
      <h3>Available Tasks</h3>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Related Files</th></tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.relatedFiles?.join(', ') || 'None'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Matched Task for Current File</h3>
      <p>{activeTask || 'None'}</p>
    </div>
  );
};

export default TaskMapping;