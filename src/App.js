// Import necessary modules
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import FileUpload from './components/FileUpload';
import TextInput from './components/TextInput';

function App() {
  // State for managing resume, job description, company info, question, and answer
  const [resume, setResume] = useState(null);
  const [jobDescriptionText, setJobDescriptionText] = useState('');
  const [companyInfoText, setCompanyInfoText] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object with necessary data
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDescriptionText', jobDescriptionText);
    formData.append('companyInfoText', companyInfoText);
    formData.append('question', question);

    // Make a POST request to the server with the FormData
    try {
      const response = await axios.post(
        'http://localhost:5000/api/generate-answer',
        formData
      );
      // Update the answer state with the received answer
      setAnswer(response.data.answer);
    } catch (err) {
      console.error(err);
    }
  };

  // Render the app
  return (
    <div className="App">
      <h1>ChatGPT Behavioral Interview</h1>
      <form onSubmit={handleSubmit}>
        {/* Upload resume */}
        <FileUpload
          label="Upload Resume"
          inputType="file"
          onChange={(file) => setResume(file)}
        />
        <br />
        {/* Enter job description */}
        <TextInput
          label="Enter Job Description"
          onChange={(text) => setJobDescriptionText(text)}
        />
        <br />
        {/* Enter company info */}
        <TextInput
          label="Enter Company Info"
          onChange={(text) => setCompanyInfoText(text)}
        />
        <br />
        {/* Enter a behavioral question */}
        <label htmlFor="question">Enter a behavioral question</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <br />
        {/* Submit the form */}
        <button type="submit">Submit</button>
      </form>
      {/* Display the question and answer */}
      <h2>Question:</h2>
      <p>{question}</p>
      <h2>Answer:</h2>
      <p>{answer}</p>
    </div>
  );
}

export default App;
