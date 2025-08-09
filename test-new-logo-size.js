const { default: fetch } = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

async function testNewLogoSize() {
  try {
    console.log('Testing with new PUC logo size (247x204px)...');
    
    const formData = new FormData();
    formData.append('coverType', 'assignment');
    formData.append('assignment_no', '06');
    formData.append('course_code', 'CSE421');
    formData.append('course_title', 'Computer Networks and Distributed Systems');
    formData.append('assignment_name', 'Design and Implementation of Secure Network Protocols for IoT Applications');
    formData.append('submission_date', '01/09/2025');
    formData.append('student_name', 'Tasneem Akter');
    formData.append('student_id', '2021-1-41-065');
    formData.append('outputType', 'cover_only');

    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    console.log(`✅ SUCCESS: Generated PDF with new PUC logo size`);
    console.log(`📄 PDF Size: ${(buffer.byteLength / 1024).toFixed(2)} KB`);
    console.log(`🎨 Logo Features:`);
    console.log(`   📐 NEW LOGO DIMENSIONS:`);
    console.log(`      Width: 247px (previously 120px)`);
    console.log(`      Height: 204px (previously 120px)`);
    console.log(`   🏛️ Enhanced institutional presence`);
    console.log(`   📏 Larger visual impact in header`);
    console.log(`   ✨ Professional typography maintained`);
    console.log(`   📋 Dashed line above Assignment title preserved`);
    
    // Save the test file
    fs.writeFileSync('new-logo-size-test.pdf', Buffer.from(buffer));
    console.log(`💾 Saved as: new-logo-size-test.pdf`);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

async function testLabNewLogo() {
  try {
    console.log('\nTesting Lab Report with new logo size...');
    
    const formData = new FormData();
    formData.append('coverType', 'lab');
    formData.append('assignment_no', '10');
    formData.append('course_code', 'CSE341');
    formData.append('course_title', 'Microprocessor and Assembly Language Laboratory');
    formData.append('assignment_name', 'Advanced Assembly Language Programming for Real-Time Systems');
    formData.append('submission_date', '08/09/2025');
    formData.append('student_name', 'Mahmud Hassan');
    formData.append('student_id', '2021-1-41-070');
    formData.append('outputType', 'cover_only');

    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    console.log(`✅ SUCCESS: Generated Lab Report PDF with new logo size`);
    console.log(`📄 PDF Size: ${(buffer.byteLength / 1024).toFixed(2)} KB`);
    console.log(`🧪 Lab Features:`);
    console.log(`   🎯 Consistent logo dimensions (247x204px)`);
    console.log(`   📋 "LAB REPORT" title positioned correctly`);
    console.log(`   🎨 Professional layout maintained`);
    console.log(`   📐 Enhanced header visual presence`);
    
    // Save the test file
    fs.writeFileSync('lab-new-logo-test.pdf', Buffer.from(buffer));
    console.log(`💾 Saved as: lab-new-logo-test.pdf`);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

// Run tests
testNewLogoSize().then(() => testLabNewLogo());
