const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Create an express app
const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with the configured storage
const upload = multer({ storage });
// POST endpoint for generating answers
app.post("/api/generate-answer", upload.single("resume"), async (req, res) => {
  try {
    // Extract necessary data from request
    const question = req.body.question;
    const resumeFile = req.file ? req.file.path : null;
    const jobDescriptionText = req.body.jobDescriptionText;
    const companyInfoText = req.body.companyInfoText;

    // Validate resume file
    if (!resumeFile) {
      return res.status(400).send("Resume file is missing");
    }

    // Save job description and company info to text files
    const commonPrefix = req.timestamp;
    const jobDescriptionPath = path.join(
      __dirname,
      "uploads",
      `${commonPrefix}-job-description.txt`
    );
    const companyInfoPath = path.join(
      __dirname,
      "uploads",
      `${commonPrefix}-company-info.txt`
    );

    fs.writeFileSync(jobDescriptionPath, jobDescriptionText);
    fs.writeFileSync(companyInfoPath, companyInfoText);

    // Call ChatGPT API with the necessary data
    const answer = await callChatGptApi(
      question,
      resumeFile,
      jobDescriptionText,
      companyInfoText
    );

    // Send the answer as a JSON response
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Function to call ChatGPT API
async function callChatGptApi(
  question,
  resumeFile,
  jobDescriptionText,
  companyInfoText
) {
  // Process files and question, call ChatGPT API, and get an answer
  const answer = "Sample answer from ChatGPT";
  return answer;
}

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
