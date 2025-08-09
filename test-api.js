const https = require('http');

// Test data for assignment cover generation
const testData = {
  assignment_no: '01',
  course_code: 'CSE 110',
  course_title: 'Introduction to Computer System Laboratory',
  assignment_name: 'Lab Report on Basic Computer Operations',
  submission_date: '2025-08-15',
  student_name: 'John Doe',
  student_id: '2021-2-60-123',
  coverType: 'assignment',
  outputType: 'cover_only'
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('Testing Assignment Cover Generator API...');
console.log('Test Data:', testData);

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ API Test Successful!');
      console.log('📄 PDF generated successfully');
      console.log(`📊 Response Size: ${data.length} bytes`);
    } else {
      console.log('❌ API Test Failed');
      console.log('Response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request Error:', error.message);
});

req.write(postData);
req.end();
