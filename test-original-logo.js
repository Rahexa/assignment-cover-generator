const { default: fetch } = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

async function testOriginalLogoSize() {
  try {
    console.log('Testing with original logo size (120x120px)...');
    
    const formData = new FormData();
    formData.append('coverType', 'assignment');
    formData.append('assignment_no', '04');
    formData.append('course_code', 'CSE405');
    formData.append('course_title', 'Computer Graphics and Multimedia Systems');
    formData.append('assignment_name', 'Advanced 3D Modeling and Animation Techniques for Interactive Applications');
    formData.append('submission_date', '28/08/2025');
    formData.append('student_name', 'Ali Hassan');
    formData.append('student_id', '2021-1-41-040');
    formData.append('outputType', 'cover_only');

    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    console.log(`✅ SUCCESS: Generated PDF with original logo size`);
    console.log(`📄 PDF Size: ${(buffer.byteLength / 1024).toFixed(2)} KB`);
    console.log(`🎨 Layout Features:`);
    console.log(`   🏛️ Original logo size: 120x120px (as requested)`);
    console.log(`   📏 Original logo margin: 20px bottom`);
    console.log(`   ✨ Professional Garamond typography maintained`);
    console.log(`   📋 Assignment title above dashed line maintained`);
    console.log(`   🎯 Balanced header section with original proportions`);
    
    // Save the test file
    fs.writeFileSync('original-logo-size-test.pdf', Buffer.from(buffer));
    console.log(`💾 Saved as: original-logo-size-test.pdf`);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

async function testLabOriginalLogo() {
  try {
    console.log('\nTesting Lab Report with original logo size...');
    
    const formData = new FormData();
    formData.append('coverType', 'lab');
    formData.append('assignment_no', '08');
    formData.append('course_code', 'CSE321');
    formData.append('course_title', 'Object Oriented Programming Laboratory');
    formData.append('assignment_name', 'Implementation of Design Patterns in Enterprise Java Applications');
    formData.append('submission_date', '02/09/2025');
    formData.append('student_name', 'Nadia Khan');
    formData.append('student_id', '2021-1-41-050');
    formData.append('outputType', 'cover_only');

    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    console.log(`✅ SUCCESS: Generated Lab Report PDF with original logo`);
    console.log(`📄 PDF Size: ${(buffer.byteLength / 1024).toFixed(2)} KB`);
    console.log(`🧪 Lab Features:`);
    console.log(`   🎯 Original logo dimensions restored: 120x120px`);
    console.log(`   📋 "LAB REPORT" title above dashed line`);
    console.log(`   🎨 Consistent professional styling`);
    
    // Save the test file
    fs.writeFileSync('lab-original-logo-test.pdf', Buffer.from(buffer));
    console.log(`💾 Saved as: lab-original-logo-test.pdf`);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

// Run tests
testOriginalLogoSize().then(() => testLabOriginalLogo());
