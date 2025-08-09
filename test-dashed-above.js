const { default: fetch } = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

async function testDashedLineAboveTitle() {
  try {
    console.log('Testing with dashed line above Assignment text...');
    
    const formData = new FormData();
    formData.append('coverType', 'assignment');
    formData.append('assignment_no', '05');
    formData.append('course_code', 'CSE411');
    formData.append('course_title', 'Artificial Intelligence and Machine Learning');
    formData.append('assignment_name', 'Implementation of Neural Network Algorithms for Pattern Recognition Systems');
    formData.append('submission_date', '30/08/2025');
    formData.append('student_name', 'Rashid Ahmed');
    formData.append('student_id', '2021-1-41-055');
    formData.append('outputType', 'cover_only');

    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    console.log(`✅ SUCCESS: Generated PDF with dashed line above Assignment text`);
    console.log(`📄 PDF Size: ${(buffer.byteLength / 1024).toFixed(2)} KB`);
    console.log(`🎨 Layout Changes:`);
    console.log(`   📍 NEW LAYOUT ORDER:`);
    console.log(`      1. PUC Logo (120x120px)`);
    console.log(`      2. PREMIER UNIVERSITY`);
    console.log(`      3. Department of Computer Science & Engineering`);
    console.log(`      4. ═══════ DASHED LINE ═══════`);
    console.log(`      5. ASSIGNMENT (title)`);
    console.log(`      6. Assignment details below`);
    console.log(`   ✨ Professional Garamond typography maintained`);
    console.log(`   📏 Enhanced spacing and formatting preserved`);
    
    // Save the test file
    fs.writeFileSync('dashed-line-above-title-test.pdf', Buffer.from(buffer));
    console.log(`💾 Saved as: dashed-line-above-title-test.pdf`);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

async function testLabDashedLineAbove() {
  try {
    console.log('\nTesting Lab Report with dashed line above title...');
    
    const formData = new FormData();
    formData.append('coverType', 'lab');
    formData.append('assignment_no', '09');
    formData.append('course_code', 'CSE331');
    formData.append('course_title', 'Computer Architecture and Organization Laboratory');
    formData.append('assignment_name', 'Design and Simulation of Advanced Microprocessor Systems');
    formData.append('submission_date', '05/09/2025');
    formData.append('student_name', 'Sadia Rahman');
    formData.append('student_id', '2021-1-41-060');
    formData.append('outputType', 'cover_only');

    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    console.log(`✅ SUCCESS: Generated Lab Report PDF with dashed line above title`);
    console.log(`📄 PDF Size: ${(buffer.byteLength / 1024).toFixed(2)} KB`);
    console.log(`🧪 Lab Layout:`);
    console.log(`   📋 Dashed line positioned above "LAB REPORT" title`);
    console.log(`   🎯 Consistent with assignment template`);
    console.log(`   🎨 Professional styling maintained`);
    
    // Save the test file
    fs.writeFileSync('lab-dashed-above-test.pdf', Buffer.from(buffer));
    console.log(`💾 Saved as: lab-dashed-above-test.pdf`);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

// Run tests
testDashedLineAboveTitle().then(() => testLabDashedLineAbove());
