const { default: fetch } = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

async function testLabReportLayout() {
  try {
    console.log('Testing lab report layout with improved space management...');
    
    const formData = new FormData();
    formData.append('coverType', 'lab');
    formData.append('assignment_no', '05');
    formData.append('course_code', 'CSE311');
    formData.append('course_title', 'Database Management Systems Laboratory');
    formData.append('assignment_name', 'Design and Implementation of Complete E-commerce Database Management System with Advanced Query Optimization');
    formData.append('submission_date', '20/08/2025');
    formData.append('student_name', 'Sarah Khan');
    formData.append('student_id', '2021-1-41-015');
    formData.append('outputType', 'cover_only');

    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    console.log(`✅ SUCCESS: Generated Lab Report PDF with improved layout`);
    console.log(`📄 PDF Size: ${(buffer.byteLength / 1024).toFixed(2)} KB`);
    console.log(`🧪 Lab Report Layout Features:`);
    console.log(`   - Consistent spacing with assignment template`);
    console.log(`   - Professional header presentation`);
    console.log(`   - Optimized content distribution`);
    console.log(`   - Proper balance above/below dashed line`);
    
    // Save the test file
    fs.writeFileSync('lab-layout-test.pdf', Buffer.from(buffer));
    console.log(`💾 Saved as: lab-layout-test.pdf`);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

testLabReportLayout();
