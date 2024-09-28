import React, { useState } from 'react';
import './styles/SocialWellbeing.css';

const SocialWellbeing = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    // Process file upload (PDF rendering can be implemented here)
    console.log('Uploaded file:', e.target.files[0]);
  };

  return (
    <div className="social-wellbeing">
      <h3>Social Well-being</h3>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      {file && <p>{file.name}</p>}
    </div>
  );
};

export default SocialWellbeing;
