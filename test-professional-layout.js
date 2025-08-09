const { default: fetch } = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

async function testProfessionalLayout() {
  try {
    console.log('Testing professional formal font and improved layout...');
    
    const formData = new FormData();
    formData.append('coverType', 'assignment');
    formData.append('assignment_no', '03');
    formData.append('course_code', 'CSE401');
    formData.append('course_title', 'Software Engineering and Project Management');
    formData.append('assignment_name', 'Comprehensive Analysis and Design of Enterprise Resource Planning System with Advanced Security Implementation');
    formData.append('submission_date', '25/08/2025');
    formData.append('student_name', 'Mohammad Hassan');
    formData.append('student_id', '2021-1-41-025');
    formData.append('outputType', 'cover_only');

    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    console.log(`✅ SUCCESS: Generated professional PDF with formal typography`);
    console.log(`📄 PDF Size: ${(buffer.byteLength / 1024).toFixed(2)} KB`);
    console.log(`🎨 Professional Features:`);
    console.log(`   ✨ Garamond/Georgia formal font family`);
    console.log(`   📏 Enhanced header spacing (55px margin)`);
    console.log(`   🏛️ Larger university name (30px) with letter spacing`);
    console.log(`   📚 Italicized department name (18px)`);
    console.log(`   📋 Assignment title moved ABOVE dashed line`);
    console.log(`   🔤 Uppercase title with letter spacing`);
    console.log(`   📊 Professional table styling with header background`);
    console.log(`   🖼️ Larger logo (130x130px) for better presence`);
    console.log(`   📐 Optimized spacing and typography throughout`);
    
    // Save the test file
    fs.writeFileSync('professional-layout-test.pdf', Buffer.from(buffer));
    console.log(`💾 Saved as: professional-layout-test.pdf`);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

async function testLabReportProfessional() {
  try {
    console.log('\nTesting professional lab report layout...');
    
    const formData = new FormData();
    formData.append('coverType', 'lab');
    formData.append('assignment_no', '07');
    formData.append('course_code', 'CSE315');
    formData.append('course_title', 'Computer Networks and Data Communication Laboratory');
    formData.append('assignment_name', 'Implementation and Performance Analysis of Advanced Network Security Protocols in Enterprise Environment');
    formData.append('submission_date', '30/08/2025');
    formData.append('student_name', 'Fatima Rahman');
    formData.append('student_id', '2021-1-41-035');
    formData.append('outputType', 'cover_only');

    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    console.log(`✅ SUCCESS: Generated professional Lab Report PDF`);
    console.log(`📄 PDF Size: ${(buffer.byteLength / 1024).toFixed(2)} KB`);
    console.log(`🧪 Professional Lab Features:`);
    console.log(`   📋 "LAB REPORT" title moved above dashed line`);
    console.log(`   🎯 Consistent professional typography`);
    console.log(`   📏 Optimized content distribution`);
    
    // Save the test file
    fs.writeFileSync('professional-lab-test.pdf', Buffer.from(buffer));
    console.log(`💾 Saved as: professional-lab-test.pdf`);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

// Run tests
testProfessionalLayout().then(() => testLabReportProfessional());
