const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/api/generate-answer', upload.fields([{ name: 'resume' }, { name: 'jobDescription' }, { name: 'companyInfo' }]), async (req, res) => {
  try {
    const question = req.body.question;
    const resumeFile = req.files.resume[0].path;
    const jobDescriptionFile = req.files.jobDescription[0].path;
    const companyInfoFile = req.files.companyInfo[0].path;

    const answer = await callChatGptApi(question, resumeFile, jobDescriptionFile, companyInfoFile);
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

async function callChatGptApi(question, resumeFile, jobDescriptionFile, companyInfoFile) {
  // Process files and question, call ChatGPT API, and get answer
  const answer = 'Sample answer from ChatGPT';
  return answer;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
