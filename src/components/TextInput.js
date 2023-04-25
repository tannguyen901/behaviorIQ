// Import necessary modules
import React from 'react';
import './TextInput.css';

// Create a reusable TextInput component
const TextInput = ({ label, onChange }) => {
  // Handle text input change event
  const handleTextInputChange = (e) => {
    const text = e.target.value;
    // Call the onChange callback with the input text
    if (onChange) {
      onChange(text);
    }
  };

  // Render the component
  return (
    <div className="text-input-container">
      <label>{label}</label>
      <textarea
        type="text"
        onChange={handleTextInputChange}
        style={{ display: 'block', marginTop: '10px' }}
      />
    </div>
  );
};

export default TextInput;
