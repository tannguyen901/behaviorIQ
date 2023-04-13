import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDescription', jobDescription);
    formData.append('companyInfo', companyInfo);
    formData.append('question', question);

    try {
      const response = await axios.post('/api/generate-answer', formData);
      setAnswer(response.data.answer);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>ChatGPT Behavioral Interview</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="resume">Upload Resume</label>
        <input type="file" id="resume" onChange={(e) => handleFileChange(e, setResume)} />
        <br />
        <label htmlFor="jobDescription">Upload Job Description</label>
        <input type="file" id="jobDescription" onChange={(e) => handleFileChange(e, setJobDescription)} />
        <br />
        <label htmlFor="companyInfo">Upload Company Info</label>
        <input type="file" id="companyInfo" onChange={(e) => handleFileChange(e, setCompanyInfo)} />
        <br />
        <label htmlFor="question">Enter a behavioral question</label>
        <input type="text" id="question" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <br />
        <button type="submit">Submit</button>
      </form>
      <h2>Question:</h2>
      <p>{question}</p>
      <h2>Answer:</h2>
      <p>{answer}</p>
    </div>
  );
}

export default App;
