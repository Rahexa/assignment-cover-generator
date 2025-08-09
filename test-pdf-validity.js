const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

// Test if the generated PDF is valid
async function testPDFValidity() {
  try {
    // Generate a test PDF using the same method as the backend
    const FormData = require('form-data');
    const fetch = require('node-fetch');
    
    const form = new FormData();
    form.append('coverType', 'assignment');
    form.append('assignment_no', '01');
    form.append('course_code', 'CSE 110');
    form.append('course_title', 'Introduction to Computer System Laboratory');
    form.append('assignment_name', 'Test Assignment');
    form.append('submission_date', '2025-08-15');
    form.append('student_name', 'Test Student');
    form.append('student_id', '2021-2-60-123');
    form.append('outputType', 'cover');
    
    console.log('Requesting PDF from API...');
    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      body: form
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const buffer = await response.buffer();
    console.log(`✅ Received PDF buffer: ${buffer.length} bytes`);
    
    // Save the PDF to a file for inspection
    fs.writeFileSync('test-output.pdf', buffer);
    console.log('✅ PDF saved as test-output.pdf');
    
    // Try to load the PDF with pdf-lib to verify structure
    try {
      const pdfDoc = await PDFDocument.load(buffer);
      console.log(`✅ PDF is valid - has ${pdfDoc.getPageCount()} pages`);
    } catch (error) {
      console.error('❌ PDF structure validation failed:', error.message);
      
      // Check if it's actually a PDF by looking at the header
      const header = buffer.slice(0, 8).toString();
      console.log('File header:', header);
      
      if (!header.startsWith('%PDF-')) {
        console.error('❌ File does not have PDF header');
        console.log('First 100 bytes:', buffer.slice(0, 100).toString());
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testPDFValidity();
