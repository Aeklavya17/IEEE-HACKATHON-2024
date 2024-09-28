import React, { useState } from 'react';
import './styles/MedicalIntegration.css';

const MedicalIntegration = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    // Process file upload (PDF rendering or medical API integration here)
    console.log('Uploaded medical report:', e.target.files[0]);
  };

  return (
    <div className="medical-integration">
      <h3>Medical Integration</h3>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      {file && <p>{file.name}</p>}
    </div>
  );
};

export default MedicalIntegration;
