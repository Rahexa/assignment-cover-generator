// Test API with FormData (like the frontend sends)
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');

async function testFormDataAPI() {
  try {
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

    console.log('Testing API with FormData...');
    
    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      body: form
    });

    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
      return;
    }

    const buffer = await response.buffer();
    console.log('✅ Success! PDF size:', buffer.length, 'bytes');
    
    // Save to file
    fs.writeFileSync('test-formdata-output.pdf', buffer);
    console.log('✅ PDF saved as test-formdata-output.pdf');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testFormDataAPI();
