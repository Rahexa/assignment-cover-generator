import { useState, useEffect } from 'react';
import './App.css';

// Simple course data
const courses = [
  { code: "CSE 110", title: "Introduction to Computer System Laboratory" },
  { code: "CSE 111", title: "Structured Programming" },
  { code: "CSE 112", title: "Structured Programming Laboratory" },
  { code: "EEE 101", title: "Electrical Circuits I" },
  { code: "CSE 221", title: "Data Structure" },
  { code: "CSE 222", title: "Data Structure Laboratory" },
  { code: "CSE 211", title: "Object Oriented Programming" },
  { code: "CSE 212", title: "Object Oriented Programming Laboratory" },
  { code: "CSE 225", title: "Algorithm Design And Analysis" },
  { code: "CSE 226", title: "Algorithm Design And Analysis Laboratory" },
  { code: "CSE 237", title: "Database Management System" },
  { code: "CSE 238", title: "Database Management System Laboratory" }
];

function App() {
  const [formData, setFormData] = useState({
    assignment_no: localStorage.getItem('assignment_no') || '',
    course_code: localStorage.getItem('course_code') || '',
    course_title: localStorage.getItem('course_title') || '',
    assignment_name: localStorage.getItem('assignment_name') || '',
    submission_date: localStorage.getItem('submission_date') || '',
    student_name: localStorage.getItem('student_name') || '',
    student_id: localStorage.getItem('student_id') || ''
  });

  const [coverType, setCoverType] = useState(localStorage.getItem('coverType') || '');
  const [outputType, setOutputType] = useState(localStorage.getItem('outputType') || 'cover');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');

  // Auto-save form data to localStorage
  useEffect(() => {
    Object.keys(formData).forEach(key => {
      localStorage.setItem(key, formData[key]);
    });
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('coverType', coverType);
  }, [coverType]);

  useEffect(() => {
    localStorage.setItem('outputType', outputType);
  }, [outputType]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setValidationError('');
  };

  const handleCourseChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const courseCode = selectedOption ? selectedOption.getAttribute('data-code') : '';
    
    setFormData(prev => ({
      ...prev,
      course_title: e.target.value,
      course_code: courseCode
    }));
  };

  const selectOutputType = (type) => {
    setOutputType(type);
    if (type === 'cover') {
      setFile(null);
    }
  };

  const clearAllData = () => {
    setFormData({
      assignment_no: '',
      course_code: '',
      course_title: '',
      assignment_name: '',
      submission_date: '',
      student_name: '',
      student_id: ''
    });
    setCoverType('');
    setOutputType('cover');
    setFile(null);
    setError('');
    setValidationError('');
    
    // Clear localStorage
    Object.keys(formData).forEach(key => localStorage.removeItem(key));
    localStorage.removeItem('coverType');
    localStorage.removeItem('outputType');
  };

  const validateForm = () => {
    const required = ['assignment_no', 'course_code', 'course_title', 'assignment_name', 'submission_date', 'student_name', 'student_id'];
    
    if (!coverType) {
      setValidationError('Please select a cover type');
      return false;
    }
    
    for (const field of required) {
      if (!formData[field]?.trim()) {
        setValidationError(`Please fill in the ${field.replace('_', ' ')} field`);
        return false;
      }
    }
    
    if (outputType === 'merged' && !file) {
      setValidationError('Please upload a PDF file for complete assignment option');
      return false;
    }
    
    return true;
  };

  const generatePDF = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('coverType', coverType);
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      formDataToSend.append('outputType', outputType === 'cover' ? 'cover_only' : 'merged');
      
      if (file && outputType === 'merged') {
        formDataToSend.append('assignment_file', file);
      }

      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Download the PDF
      const blob = new Blob([uint8Array], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${coverType}_cover_${formData.student_name || 'student'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError(`Failed to generate PDF: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #f3e8ff 100%)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'white',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1.5rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              padding: '0.75rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🎓</span>
            </div>
            <div>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                margin: 0
              }}>
                Assignment Cover Generator
              </h1>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                Create professional cover pages instantly
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1rem' }}>✨</span>
            <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
              Premier University
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          border: '1px solid #f3f4f6'
        }}>
          
          {/* Error Messages */}
          {error && (
            <div style={{
              marginBottom: '1.5rem',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.75rem',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{ color: '#ef4444', fontSize: '1.125rem' }}>⚠️</span>
              <div style={{ color: '#dc2626', fontSize: '0.875rem' }}>{error}</div>
            </div>
          )}

          {validationError && (
            <div style={{
              marginBottom: '1.5rem',
              background: '#fffbeb',
              border: '1px solid #fed7aa',
              borderRadius: '0.75rem',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{ color: '#f59e0b', fontSize: '1.125rem' }}>⚠️</span>
              <div style={{ color: '#d97706', fontSize: '0.875rem' }}>{validationError}</div>
            </div>
          )}

          {/* Cover Type Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.75rem'
            }}>
              📄 Cover Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <button
                onClick={() => setCoverType('assignment')}
                style={{
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${coverType === 'assignment' ? '#4f46e5' : '#e5e7eb'}`,
                  background: coverType === 'assignment' ? '#eef2ff' : 'white',
                  color: coverType === 'assignment' ? '#3730a3' : '#374151',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  fontSize: '0.875rem'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📄</div>
                <div style={{ fontWeight: '600' }}>Assignment</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Regular assignments</div>
              </button>
              <button
                onClick={() => setCoverType('lab')}
                style={{
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${coverType === 'lab' ? '#7c3aed' : '#e5e7eb'}`,
                  background: coverType === 'lab' ? '#faf5ff' : 'white',
                  color: coverType === 'lab' ? '#581c87' : '#374151',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  fontSize: '0.875rem'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔬</div>
                <div style={{ fontWeight: '600' }}>Lab Report</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Laboratory work</div>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          {coverType && (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              
              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    📄 {coverType === 'lab' ? 'Lab Report No.' : 'Assignment No.'}
                  </label>
                  <input
                    id="assignment_no"
                    type="text"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Enter number..."
                    value={formData.assignment_no}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    📚 Course Title
                  </label>
                  <select
                    id="course_title"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box',
                      background: 'white'
                    }}
                    value={formData.course_title}
                    onChange={handleCourseChange}
                  >
                    <option value="" disabled>Select Course Title</option>
                    {courses.map(course => (
                      <option key={course.code} value={course.title} data-code={course.code}>
                        {course.code} - {course.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  📝 {coverType === 'lab' ? 'Lab Report Name' : 'Assignment Name'}
                </label>
                <input
                  id="assignment_name"
                  type="text"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter descriptive name..."
                  value={formData.assignment_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Row 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    📅 Submission Date
                  </label>
                  <input
                    id="submission_date"
                    type="date"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    value={formData.submission_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    👤 Student Name
                  </label>
                  <input
                    id="student_name"
                    type="text"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Enter full name..."
                    value={formData.student_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    🆔 Student ID
                  </label>
                  <input
                    id="student_id"
                    type="text"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Enter ID..."
                    value={formData.student_id}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Output Type Selection */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.75rem'
                }}>
                  ✅ Output Type
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <button
                    onClick={() => selectOutputType('cover')}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      border: `2px solid ${outputType === 'cover' ? '#10b981' : '#e5e7eb'}`,
                      background: outputType === 'cover' ? '#ecfdf5' : 'white',
                      color: outputType === 'cover' ? '#047857' : '#374151',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      fontSize: '0.875rem'
                    }}
                  >
                    <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>📄</div>
                    <div style={{ fontWeight: '600' }}>Cover Page Only</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Just the cover page</div>
                  </button>
                  <button
                    onClick={() => selectOutputType('merged')}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      border: `2px solid ${outputType === 'merged' ? '#3b82f6' : '#e5e7eb'}`,
                      background: outputType === 'merged' ? '#eff6ff' : 'white',
                      color: outputType === 'merged' ? '#1d4ed8' : '#374151',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      fontSize: '0.875rem'
                    }}
                  >
                    <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>📤</div>
                    <div style={{ fontWeight: '600' }}>Complete Assignment</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Cover + uploaded file</div>
                  </button>
                </div>
              </div>

              {/* File Upload */}
              {outputType === 'merged' && (
                <div style={{
                  background: '#f9fafb',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  border: '2px dashed #d1d5db',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📤</div>
                  <label htmlFor="assignment_file" style={{ cursor: 'pointer' }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.75rem',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-block',
                      transition: 'all 0.2s'
                    }}>
                      Choose PDF File
                    </span>
                    <input
                      id="assignment_file"
                      type="file"
                      accept=".pdf"
                      style={{ display: 'none' }}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                  {file && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      📄 {file.name}
                    </div>
                  )}
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem', margin: '0.5rem 0 0 0' }}>
                    Upload your assignment PDF to merge with cover page
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem', 
                paddingTop: '1.5rem',
                '@media (min-width: 640px)': {
                  flexDirection: 'row'
                }
              }}>
                <button
                  onClick={generatePDF}
                  disabled={isLoading}
                  style={{
                    flex: '1',
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1,
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {isLoading ? (
                    <>
                      <div style={{
                        animation: 'spin 1s linear infinite',
                        width: '1.25rem',
                        height: '1.25rem',
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        borderRadius: '50%'
                      }}></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      <span>Generate Cover Page</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={clearAllData}
                  style={{
                    padding: '1rem 2rem',
                    border: '2px solid #d1d5db',
                    color: '#374151',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>↺</span>
                  <span>Clear All</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: '#1f2937',
        color: 'white',
        padding: '2rem 1rem',
        marginTop: '4rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🎓</span>
            <span style={{ fontWeight: '600' }}>Assignment Cover Generator</span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>
            © 2025 Premier University - Department of Computer Science & Engineering
          </p>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '1rem', 
            marginTop: '1rem', 
            fontSize: '0.875rem', 
            color: '#9ca3af',
            flexWrap: 'wrap'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ color: '#fbbf24' }}>✨</span>
              <span>Professional PDF Generation</span>
            </span>
            <span>•</span>
            <span>Modern & Responsive Design</span>
            <span>•</span>
            <span>Built with React</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        button:hover {
          transform: translateY(-1px);
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        
        @media (max-width: 768px) {
          .footer-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
