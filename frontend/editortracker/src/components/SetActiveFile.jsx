import React, { useState } from 'react';
import { apiService } from '../services/apiService';

const SetActiveFile = ({ onFileSet }) => {
  const [file, setFile] = useState('');

  const handleSubmit = async () => {
    if (!file.trim()) return;

    try {
      await apiService.setActiveFile(file);
      onFileSet(file); // pass file to parent
    } catch (error) {
      console.error('Error setting active file:', error);
    }
  };

  return (
    <div className="panel">
      <h2>Set Active File</h2>
      <input
        type="text"
        value={file}
        onChange={(e) => setFile(e.target.value)}
        placeholder="Enter file path"
      />
      <button onClick={handleSubmit}>Set Active File</button>
    </div>
  );
};

export default SetActiveFile;