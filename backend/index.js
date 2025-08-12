const express = require('express');
const { PDFDocument } = require('pdf-lib');
const puppeteer = require('puppeteer');
const multer = require('multer');
const mammoth = require('mammoth');
const fs = require('fs-extra');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Read and convert logo to base64
let logoBase64 = '';
try {
  const logoPath = path.join(__dirname, 'public', 'logo-puc.png');
  const logoBuffer = fs.readFileSync(logoPath);
  logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
} catch (error) {
  console.warn('Logo file not found, using placeholder');
  logoBase64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZGRkIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5MT0dPPC90ZXh0Pgo8L3N2Zz4K';
}

// Enable CORS for all routes
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173', 
    'http://localhost:5174', 
    'http://localhost:5175', 
    'http://localhost:5176', 
    'http://localhost:5177', 
    'http://localhost:5178', 
    'http://localhost:5179', 
    'http://localhost:5180',
    'http://localhost:3001',
    'http://127.0.0.1:5177',
    /^http:\/\/localhost:\d+$/,  // Allow any localhost port
    /^https:\/\/.*\.vercel\.app$/ // Allow Vercel domains
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});

// CORS test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'CORS is working!', timestamp: new Date().toISOString() });
});

const assignmentTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Assignment Cover Page</title>
  <style>
    @page { size: A4; margin: 15mm; }
    body { font-family: "Times New Roman", Times, serif; margin: 0; padding: 0; }
    .container { 
      width: 100%; 
      border: 2px solid #000; 
      padding: 15px 20px; 
      box-sizing: border-box; 
      page-break-inside: avoid; 
      height: calc(297mm - 30mm); 
      max-height: calc(297mm - 30mm);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .header { text-align: center; margin-bottom: 55px; flex-shrink: 0; }
    .header img {
      width: 100px;
      height: auto;
      object-fit: contain;
      display: block;
      margin: 0 auto 20px;
    }
    .university-name { font-size: 30px; font-weight: bold; margin-bottom: 10px; letter-spacing: 1px; }
    .department-name { font-size: 18px; margin-bottom: 25px; font-style: italic; }
    .title { text-align: center; font-size: 26px; font-weight: bold; text-decoration: underline; margin: 0 0 40px; flex-shrink: 0; text-transform: uppercase; letter-spacing: 2px; }
    hr.dotted-line { border: none; border-top: 2px dashed #000; margin: 15px 0 25px; flex-shrink: 0; }
    .assignment-info { 
      font-size: 18px; 
      display: grid; 
      grid-template-columns: max-content max-content 1fr; 
      column-gap: 15px; 
      row-gap: 18px; 
      max-width: 100%; 
      margin-bottom: 25px; 
      flex-shrink: 0;
    }
    .label { white-space: nowrap; font-weight: 500; }
    .colon { text-align: center; font-weight: bold; }
    .value { 
      font-weight: bold; 
      word-wrap: break-word; 
      overflow-wrap: break-word;
      hyphens: auto;
      line-height: 1.3;
    }
    /* Dynamic font sizing for long assignment names */
    .value.long-text {
      font-size: 16px;
      line-height: 1.4;
    }
    .submitted-to-title { margin-top: 25px; margin-bottom: 20px; font-weight: bold; text-decoration: underline; font-size: 18px; flex-shrink: 0; }
    .section-title { font-size: 18px; margin-top: 20px; font-weight: bold; text-decoration: underline; margin-bottom: 15px; flex-shrink: 0; }
    .submitted-section { margin-top: 10px; display: flex; justify-content: space-between; flex-grow: 1; align-items: flex-start; }
    .info-table { width: 380px; border-collapse: collapse; font-size: 16px; }
    .info-table th,
    .info-table td {
      border: 1px solid #000;
      padding: 6px 10px;
      text-align: left;
      font-size: 16px;
    }
    .info-table th { font-weight: bold; background-color: #f8f8f8; }
    .info-table td { font-weight: normal; }
    .remarks-box { border: 2px solid black; width: 180px; height: 100px; margin-left: 20px; display: flex; align-items: center; justify-content: center; position: relative; font-size: 16px; }
    .remarks-text { position: absolute; top: 5px; left: 0; width: 100%; text-align: center; font-weight: bold; border-bottom: 1px solid black; padding-bottom: 5px; }
  </style>
  <script>
    function adjustFontSizes() {
      // Check assignment name length and adjust font size
      const assignmentNameElement = document.querySelector('[data-field="assignment_name"]');
      if (assignmentNameElement) {
        const text = assignmentNameElement.textContent;
        if (text.length > 50) {
          assignmentNameElement.classList.add('long-text');
        }
      }
    }
    
    // Run after page loads
    window.addEventListener('load', adjustFontSizes);
  </script>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${logoBase64}" alt="Premier University Logo" />
      <div class="university-name">PREMIER UNIVERSITY</div>
      <div class="department-name">Department of Computer Science & Engineering</div>
      <hr class="dotted-line" />
      <div class="title">Assignment</div>
    </div>
    <div class="assignment-info">
      <div class="label">Assignment No.</div><div class="colon">:</div><div class="value">{{assignment_no}}</div>
      <div class="label">Course Code</div><div class="colon">:</div><div class="value">{{course_code}}</div>
      <div class="label">Course Title</div><div class="colon">:</div><div class="value">{{course_title}}</div>
      <div class="label">Assignment Name</div><div class="colon">:</div><div class="value" data-field="assignment_name">{{assignment_name}}</div>
      <div class="label">Date of Submission</div><div class="colon">:</div><div class="value">{{submission_date}}</div>
    </div>
    <div class="submitted-to-title">Submitted to</div>
    <div class="section-title">Submitted by</div>
    <div class="submitted-section">
      <div>
        <table class="info-table">
          <tr><th>Name</th><td>{{student_name}}</td></tr>
          <tr><th>ID</th><td>{{student_id}}</td></tr>
          <tr><th>Program</th><td>B.Sc. in CSE</td></tr>
          <tr><th>Batch</th><td>41</td></tr>
          <tr><th>Section</th><td>C</td></tr>
          <tr><th>Session</th><td>Spring 2025</td></tr>
        </table>
      </div>
      <div class="remarks-box">
        <div class="remarks-text">Remarks</div>
      </div>
    </div>
  </div>
</body>
</html>
`;

const labTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Lab Report Cover Page</title>
  <style>
    @page { size: A4; margin: 15mm; }
    body { font-family: "Times New Roman", Times, serif; margin: 0; padding: 0; }
    .container { 
      width: 100%; 
      border: 2px solid #000; 
      padding: 15px 20px; 
      box-sizing: border-box; 
      page-break-inside: avoid; 
      height: calc(297mm - 30mm); 
      max-height: calc(297mm - 30mm);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .header { text-align: center; margin-bottom: 55px; flex-shrink: 0; }
    .header img {
      width: 100px;
      height: auto;
      object-fit: contain;
      display: block;
      margin: 0 auto 20px;
    }
    .university-name { font-size: 30px; font-weight: bold; margin-bottom: 10px; letter-spacing: 1px; }
    .department-name { font-size: 18px; margin-bottom: 25px; font-style: italic; }
    .title { text-align: center; font-size: 26px; font-weight: bold; text-decoration: underline; margin: 0 0 40px; flex-shrink: 0; text-transform: uppercase; letter-spacing: 2px; }
    hr.dotted-line { border: none; border-top: 2px dashed #000; margin: 15px 0 25px; flex-shrink: 0; }
    .assignment-info { 
      font-size: 18px; 
      display: grid; 
      grid-template-columns: max-content max-content 1fr; 
      column-gap: 15px; 
      row-gap: 18px; 
      max-width: 100%; 
      margin-bottom: 25px; 
      flex-shrink: 0;
    }
    .label { white-space: nowrap; font-weight: 500; }
    .colon { text-align: center; font-weight: bold; }
    .value { 
      font-weight: bold; 
      word-wrap: break-word; 
      overflow-wrap: break-word;
      hyphens: auto;
      line-height: 1.3;
    }
    /* Dynamic font sizing for long assignment names */
    .value.long-text {
      font-size: 16px;
      line-height: 1.4;
    }
    .submitted-to-title { margin-top: 25px; margin-bottom: 20px; font-weight: bold; text-decoration: underline; font-size: 18px; flex-shrink: 0; }
    .section-title { font-size: 18px; margin-top: 20px; font-weight: bold; text-decoration: underline; margin-bottom: 15px; flex-shrink: 0; }
    .submitted-section { margin-top: 10px; display: flex; justify-content: space-between; flex-grow: 1; align-items: flex-start; }
    .info-table { width: 380px; border-collapse: collapse; font-size: 16px; }
    .info-table th,
    .info-table td {
      border: 1px solid #000;
      padding: 6px 10px;
      text-align: left;
      font-size: 16px;
    }
    .info-table th { font-weight: bold; background-color: #f8f8f8; }
    .info-table td { font-weight: normal; }
    .remarks-box { border: 2px solid black; width: 180px; height: 100px; margin-left: 20px; display: flex; align-items: center; justify-content: center; position: relative; font-size: 16px; }
    .remarks-text { position: absolute; top: 5px; left: 0; width: 100%; text-align: center; font-weight: bold; border-bottom: 1px solid black; padding-bottom: 5px; }
  </style>
  <script>
    function adjustFontSizes() {
      // Check assignment name length and adjust font size
      const assignmentNameElement = document.querySelector('[data-field="assignment_name"]');
      if (assignmentNameElement) {
        const text = assignmentNameElement.textContent;
        if (text.length > 50) {
          assignmentNameElement.classList.add('long-text');
        }
      }
    }
    
    // Run after page loads
    window.addEventListener('load', adjustFontSizes);
  </script>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${logoBase64}" alt="Premier University Logo" />
      <div class="university-name">PREMIER UNIVERSITY</div>
      <div class="department-name">Department of Computer Science & Engineering</div>
      <hr class="dotted-line" />
      <div class="title">Lab Report</div>
    </div>
    <div class="assignment-info">
      <div class="label">Lab Report No.</div><div class="colon">:</div><div class="value">{{assignment_no}}</div>
      <div class="label">Course Code</div><div class="colon">:</div><div class="value">{{course_code}}</div>
      <div class="label">Course Title</div><div class="colon">:</div><div class="value">{{course_title}}</div>
      <div class="label">Report Name</div><div class="colon">:</div><div class="value" data-field="assignment_name">{{assignment_name}}</div>
      <div class="label">Date of Submission</div><div class="colon">:</div><div class="value">{{submission_date}}</div>
    </div>
    <div class="submitted-to-title">Submitted to</div>
    <div class="section-title">Submitted by</div>
    <div class="submitted-section">
      <div>
        <table class="info-table">
          <tr><th>Name</th><td>{{student_name}}</td></tr>
          <tr><th>ID</th><td>{{student_id}}</td></tr>
          <tr><th>Program</th><td>B.Sc. in CSE</td></tr>
          <tr><th>Batch</th><td>41</td></tr>
          <tr><th>Section</th><td>C</td></tr>
          <tr><th>Session</th><td>Spring 2025</td></tr>
        </table>
      </div>
      <div class="remarks-box">
        <div class="remarks-text">Remarks</div>
      </div>
    </div>
  </div>
</body>
</html>
`;

app.use(express.json());
app.use(express.static('public')); // Serve static files from public directory

app.post('/api/generate', upload.single('assignment_file'), async (req, res) => {
  try {
    const { coverType, assignment_no, course_code, course_title, assignment_name, submission_date, student_name, student_id, outputType } = req.body;

    if (!coverType || !['assignment', 'lab'].includes(coverType)) {
      return res.status(400).json({ error: 'Invalid cover type' });
    }

    if (!assignment_no || !course_code || !course_title || !assignment_name || !submission_date || !student_name || !student_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Support for PDF, DOC, and DOCX files
    const supportedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (outputType === 'merged' && (!req.file || !supportedMimeTypes.includes(req.file.mimetype))) {
      return res.status(400).json({ error: 'A valid PDF, DOC, or DOCX file is required for merged output' });
    }

    const template = coverType === 'assignment' ? assignmentTemplate() : labTemplate();
    const html = template
      .replace('{{assignment_no}}', assignment_no)
      .replace('{{course_code}}', course_code)
      .replace('{{course_title}}', course_title)
      .replace('{{assignment_name}}', assignment_name)
      .replace('{{submission_date}}', submission_date)
      .replace('{{student_name}}', student_name)
      .replace('{{student_id}}', student_id);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const coverPdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    const finalPdf = await PDFDocument.create();
    const coverDoc = await PDFDocument.load(coverPdfBuffer);
    const coverPages = await finalPdf.copyPages(coverDoc, coverDoc.getPageIndices());
    coverPages.forEach(page => finalPdf.addPage(page));

    if (outputType === 'merged' && req.file) {
      let documentBuffer = req.file.buffer;
      
      // Convert DOC/DOCX to PDF if needed
      if (req.file.mimetype === 'application/msword' || 
          req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        
        try {
          // Extract text from Word document
          const result = await mammoth.extractRawText({ buffer: req.file.buffer });
          const documentText = result.value;
          
          // Create HTML from the extracted text
          const documentHtml = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <style>
                @page { size: A4; margin: 20mm; }
                body { 
                  font-family: "Times New Roman", serif; 
                  font-size: 12pt; 
                  line-height: 1.6; 
                  margin: 0; 
                  padding: 20px;
                }
                p { margin-bottom: 12pt; }
                h1, h2, h3 { margin-top: 20pt; margin-bottom: 12pt; }
              </style>
            </head>
            <body>
              ${documentText.split('\n').map(line => `<p>${line}</p>`).join('')}
            </body>
            </html>
          `;
          
          // Convert HTML to PDF
          const docBrowser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
          });
          const docPage = await docBrowser.newPage();
          await docPage.setContent(documentHtml);
          documentBuffer = await docPage.pdf({ format: 'A4' });
          await docBrowser.close();
        } catch (conversionError) {
          console.error('Error converting document:', conversionError);
          return res.status(500).json({ error: 'Failed to convert document to PDF' });
        }
      }
      
      const uploadedDoc = await PDFDocument.load(documentBuffer);
      const uploadedPages = await finalPdf.copyPages(uploadedDoc, uploadedDoc.getPageIndices());
      uploadedPages.forEach(page => finalPdf.addPage(page));
    }

    const pdfBytes = await finalPdf.save();
    
    // Ensure we're sending binary data
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${coverType}_cover.pdf`);
    res.setHeader('Content-Length', pdfBytes.length);
    
    // Send as Buffer to ensure binary data
    res.end(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: error.message || 'Failed to generate PDF' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

module.exports = app;