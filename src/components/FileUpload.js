// Import necessary modules
import React, { useRef } from 'react';
import './FileUpload.css';

// Create a reusable FileUpload component
const FileUpload = ({ label, onChange }) => {
  // Ref for managing file input
  const fileInputRef = useRef();

  // Handle click event on the button
  const handleClick = () => {
    // Trigger file input click event
    fileInputRef.current.click();
  };

  // Handle file input change event
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Call the onChange callback with the selected file
    if (onChange) {
      onChange(selectedFile);
    }
  };

  // Render the component
  return (
    <div className="file-upload-container">
      <button type="button" onClick={handleClick}>
        {label}
      </button>
      {/* Render file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileUpload;
