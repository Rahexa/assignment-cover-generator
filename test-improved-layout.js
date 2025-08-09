const { default: fetch } = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

async function testImprovedLayout() {
  try {
    console.log('Testing improved layout with better space management...');
    
    const formData = new FormData();
    formData.append('coverType', 'assignment');
    formData.append('assignment_no', '01');
    formData.append('course_code', 'CSE301');
    formData.append('course_title', 'Data Structures and Algorithms');
    formData.append('assignment_name', 'Implementation of Advanced Binary Search Tree with AVL Balancing Algorithm and Performance Analysis Report');
    formData.append('submission_date', '15/08/2025');
    formData.append('student_name', 'Ahmed Rahman');
    formData.append('student_id', '2021-1-41-003');
    formData.append('outputType', 'cover_only');

    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.buffer();
    console.log(`✅ SUCCESS: Generated PDF with improved layout`);
    console.log(`📄 PDF Size: ${(buffer.length / 1024).toFixed(2)} KB`);
    console.log(`🎨 Layout Features:`);
    console.log(`   - Enhanced header spacing (45px margin-bottom)`);
    console.log(`   - Larger university name (28px)`);
    console.log(`   - Better department text (17px)`);
    console.log(`   - Optimized dashed line positioning`);
    console.log(`   - Improved font sizes throughout`);
    console.log(`   - Better table padding and spacing`);
    console.log(`   - Dynamic font sizing for long names`);
    
    // Save the test file
    fs.writeFileSync('improved-layout-test.pdf', buffer);
    console.log(`💾 Saved as: improved-layout-test.pdf`);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

testImprovedLayout();
