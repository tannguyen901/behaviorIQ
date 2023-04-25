// Import necessary modules
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import FileUpload from "./components/FileUpload";
import TextInput from "./components/TextInput";

function App() {
  // State for managing resume, job description, company info, question, and answer
  const [resume, setResume] = useState(null);
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [companyInfoText, setCompanyInfoText] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if resume is uploaded
    if (!resume) {
      setError("Please upload a resume.");
      return;
    }

    setError(""); // Clear previous error

    // Create FormData object with necessary data
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescriptionText", jobDescriptionText);
    formData.append("companyInfoText", companyInfoText);

    // Make a POST request to the server with the FormData
    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-answer",
        formData
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Render the app
  return (
    <div className="App">
      <div className="top-section">
        <img src="logo.png" alt="Company Logo" className="logo" />
        <h1>ChatGPT Behavioral Interview</h1>
        <div className="tips-and-resources">
          {/* Add tips and resources links here */}
          <a href="/tips">Tips</a>
          <a href="/resources" style={{ marginLeft: "10px" }}>
            Resources
          </a>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="left-section">
          <form onSubmit={handleSubmit}>
            <FileUpload
              label="Upload Resume"
              inputType="file"
              onChange={(file) => setResume(file)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <br />
            <TextInput
              label="Enter Job Description"
              onChange={(text) => setJobDescriptionText(text)}
            />
            <br />
            <TextInput
              label="Enter Company Info"
              onChange={(text) => setCompanyInfoText(text)}
            />
            <br />
            <button type="submit">Submit</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
        <div className="right-section">
          <h1>test</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
