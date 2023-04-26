// OVERWRITING FILES
// // POST endpoint for generating answers
// app.post('/api/generate-answer', upload.single('resume'), async (req, res) => {
//     try {
//       // Extract necessary data from request
//       const question = req.body.question;
//       const resumeFile = req.file ? req.file.path : null;
//       const jobDescriptionText = req.body.jobDescriptionText;
//       const companyInfoText = req.body.companyInfoText;

//       // Validate resume file
//       if (!resumeFile) {
//         return res.status(400).send('Resume file is missing');
//       }

//       // Save job description and company info to text files
//       const commonPrefix = req.timestamp;
//       const jobDescriptionPath = path.join(__dirname, 'uploads', `${commonPrefix}-job-description.txt`);
//       const companyInfoPath = path.join(__dirname, 'uploads', `${commonPrefix}-company-info.txt`);

//       fs.writeFileSync(jobDescriptionPath, jobDescriptionText);
//       fs.writeFileSync(companyInfoPath, companyInfoText);

//       // Call ChatGPT API with the necessary data
//       const answer = await callChatGptApi(question, resumeFile, jobDescriptionText, companyInfoText);

//       // Send the answer as a JSON response
//       res.json({ answer });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Server error');
//     }
//   });

//NEW FILES
// app.post('/api/generate-answer', upload.single('resume'), async (req, res) => {
//     try {
//       const question = req.body.question;
//       const resumeFile = req.file ? req.file.path : null;
//       const jobDescriptionText = req.body.jobDescriptionText;
//       const companyInfoText = req.body.companyInfoText;

//       if (!resumeFile) {
//         return res.status(400).send('Resume file is missing');
//       }

//       // Save job description and company info to text files
//       const timestamp = Date.now();
//       const jobDescriptionPath = path.join(__dirname, 'uploads', `${timestamp}-job-description.txt`);
//       const companyInfoPath = path.join(__dirname, 'uploads', `${timestamp}-company-info.txt`);

//       fs.writeFileSync(jobDescriptionPath, jobDescriptionText);
//       fs.writeFileSync(companyInfoPath, companyInfoText);

//       const answer = await callChatGptApi(question, resumeFile, jobDescriptionText, companyInfoText);
//       res.json({ answer });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Server error');
//     }
//   });
