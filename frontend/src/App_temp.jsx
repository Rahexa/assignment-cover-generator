import { useState, useEffect } from 'react';
import './App.css';

// Complete course data with search keywords
const courses = [
  { code: "CSE 110", title: "Introduction to Computer System Laboratory", keywords: ["csl", "intro", "computer", "system", "lab"] },
  { code: "CSE 111", title: "Structured Programming", keywords: ["sp", "structured", "programming"] },
  { code: "CSE 112", title: "Structured Programming Laboratory", keywords: ["spl", "structured", "programming", "lab"] },
  { code: "EEE 101", title: "Electrical Circuits I", keywords: ["ec1", "electrical", "circuits"] },
  { code: "EEE 102", title: "Electrical Circuits I Laboratory", keywords: ["ec1l", "electrical", "circuits", "lab"] },
  { code: "ENG 101", title: "General English", keywords: ["eng", "english", "general"] },
  { code: "MAT 105", title: "Engineering Mathematics I", keywords: ["math1", "math", "mathematics", "engineering"] },
  { code: "ME 102", title: "Mechanical Engineering Drawing & CAD Laboratory", keywords: ["me cad lab", "mechanical", "drawing", "cad", "lab"] },
  { code: "CSE 103", title: "Discrete Mathematics", keywords: ["dm", "discrete", "math", "mathematics"] },
  { code: "CSE 221", title: "Data Structure", keywords: ["ds", "data", "structure"] },
  { code: "CSE 222", title: "Data Structure Laboratory", keywords: ["dsl", "data", "structure", "lab"] },
  { code: "ECO 201", title: "Basic Economics", keywords: ["eco", "economics", "basic"] },
  { code: "EEE 211", title: "Electronics I", keywords: ["elec1", "electronics", "electronic"] },
  { code: "EEE 212", title: "Electronics I Laboratory", keywords: ["elec1l", "electronics", "lab", "electronic"] },
  { code: "PHY 101", title: "Engineering Physics I", keywords: ["phy1", "physics", "engineering"] },
  { code: "CSE 211", title: "Object Oriented Programming", keywords: ["oop", "object", "oriented", "programming"] },
  { code: "CSE 212", title: "Object Oriented Programming Laboratory", keywords: ["oopl", "object", "oriented", "programming", "lab"] },
  { code: "CSE 302", title: "Computational Methods for Engineering Problems Laboratory", keywords: ["cmepl", "computational", "methods", "engineering", "lab"] },
  { code: "EEE 311", title: "Digital Electronics", keywords: ["de", "digital", "electronics"] },
  { code: "EEE 312", title: "Digital Electronics Laboratory", keywords: ["del", "digital", "electronics", "lab"] },
  { code: "ENG 103", title: "Developing English Skills", keywords: ["des", "english", "developing", "skills"] },
  { code: "MAT 201", title: "Engineering Mathematics III", keywords: ["math3", "math", "mathematics", "engineering"] },
  { code: "CSE 225", title: "Algorithm Design And Analysis", keywords: ["ada", "algorithm", "design", "analysis"] },
  { code: "CSE 226", title: "Algorithm Design And Analysis Laboratory", keywords: ["adal", "algorithm", "design", "analysis", "lab"] },
  { code: "CSE 237", title: "Database Management System", keywords: ["dbms", "database", "management", "system"] },
  { code: "CSE 238", title: "Database Management System Laboratory", keywords: ["dbmsl", "database", "management", "system", "lab"] },
  { code: "EEE 371", title: "Microprocessors & Microcontrollers", keywords: ["mm", "microprocessor", "microcontroller", "micro"] },
  { code: "EEE 372", title: "Microprocessors & Microcontrollers Laboratory", keywords: ["mml", "microprocessor", "microcontroller", "lab", "micro"] },
  { code: "MAT 203", title: "Engineering Mathematics IV", keywords: ["math4", "math", "mathematics", "engineering"] },
  { code: "CSE 317", title: "Artificial Intelligence", keywords: ["ai", "artificial", "intelligence"] },
  { code: "CSE 318", title: "Artificial Intelligence Laboratory", keywords: ["ail", "artificial", "intelligence", "lab"] },
  { code: "CSE 333", title: "Operating Systems", keywords: ["os", "operating", "system"] },
  { code: "CSE 334", title: "Operating Systems Laboratory", keywords: ["osl", "operating", "system", "lab"] },
  { code: "CSE 337", title: "Computer Organization & Architecture", keywords: ["coa", "computer", "organization", "architecture"] },
  { code: "CSE 305", title: "Software Engineering & Information System Design", keywords: ["seisd", "software", "engineering", "information", "system", "design"] },
  { code: "CSE 306", title: "Software Engineering & Information System Design Laboratory", keywords: ["seisdl", "software", "engineering", "information", "system", "design", "lab"] },
  { code: "CSE 338", title: "Software Development", keywords: ["sd", "software", "development"] },
  { code: "CSE 364", title: "Data Communication", keywords: ["dc", "data", "communication"] },
  { code: "CSE 367", title: "Computer Network", keywords: ["cn", "computer", "network"] },
  { code: "CSE 368", title: "Computer Network Laboratory", keywords: ["cnl", "computer", "network", "lab"] },
  { code: "CSE 437", title: "Network and Computer Security", keywords: ["ncs", "network", "computer", "security"] },
  { code: "CSE 309", title: "Theory of Computation", keywords: ["toc", "theory", "computation"] },
  { code: "CSE 451", title: "Neural Network & Fuzzy Logic", keywords: ["nnfl", "neural", "network", "fuzzy", "logic"] },
  { code: "CSE 452", title: "Neural Network & Fuzzy Logic Laboratory", keywords: ["nnfll", "neural", "network", "fuzzy", "logic", "lab"] },
  { code: "CSE 455", title: "Computer Graphics & Image Processing", keywords: ["cgip", "computer", "graphics", "image", "processing"] },
  { code: "CSE 456", title: "Computer Graphics & Image Processing Laboratory", keywords: ["cgipl", "computer", "graphics", "image", "processing", "lab"] },
  { code: "EEE 313", title: "Control Systems", keywords: ["cs", "control", "system"] },
  { code: "EEE 314", title: "Control Systems Laboratory", keywords: ["csl", "control", "system", "lab"] },
  { code: "ENG 401", title: "Technical Writing & Presentation", keywords: ["twp", "technical", "writing", "presentation"] },
  { code: "CSE 453", title: "Compiler Construction", keywords: ["cc", "compiler", "construction"] },
  { code: "CSE 454", title: "Compiler Construction Laboratory", keywords: ["ccl", "compiler", "construction", "lab"] },
  { code: "CSE 457", title: "Machine Learning", keywords: ["ml", "machine", "learning"] },
  { code: "CSE 458", title: "Machine Learning Laboratory", keywords: ["mll", "machine", "learning", "lab"] },
  { code: "CSE 459", title: "Pattern Recognition", keywords: ["pr", "pattern", "recognition"] },
  { code: "CSE 460", title: "Pattern Recognition Laboratory", keywords: ["prl", "pattern", "recognition", "lab"] },
  { code: "CSE 481", title: "Contemporary Course of Computer Science", keywords: ["ccs", "contemporary", "computer", "science"] },
  { code: "CSE 482", title: "Contemporary Course of Computer Science Laboratory", keywords: ["ccsl", "contemporary", "computer", "science", "lab"] }
];

function App() {
  const [formData, setFormData] = useState({
    assignment_no: localStorage.getItem('assignment_no') || '',
    course_code: localStorage.getItem('course_code') || '',
    course_title: localStorage.getItem('course_title') || '',
    assignment_name: localStorage.getItem('assignment_name') || '',
    submission_date: localStorage.getItem('submission_date') || '',
    student_name: localStorage.getItem('student_name') || '',
    student_id: localStorage.getItem('student_id') || '',
    batch: localStorage.getItem('batch') || '',
    section: localStorage.getItem('section') || '',
    session: localStorage.getItem('session') || ''
  });

  const [coverType, setCoverType] = useState('assignment'); // Default to assignment
  const [outputType, setOutputType] = useState(localStorage.getItem('outputType') || 'cover');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [courseSearch, setCourseSearch] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(localStorage.getItem('selectedTemplate') || 'template1');

  // Template preview component
  const renderTemplatePreview = () => {
    if (selectedTemplate === 'template1') {
      return (
        <div style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: '0.375rem',
          padding: '1rem',
          marginBottom: '0.75rem',
          border: '1px solid rgba(148, 163, 184, 0.3)',
          minHeight: '300px',
          position: 'relative',
          fontFamily: '"Times New Roman", serif',
          color: '#1e293b'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            borderBottom: '2px solid #1e293b',
            paddingBottom: '0.75rem',
            marginBottom: '1rem'
          }}>
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              margin: '0 0 0.25rem 0',
              color: '#1e293b'
            }}>
              International University of Business Agriculture and Technology
            </h1>
            <p style={{ fontSize: '0.75rem', margin: 0, color: '#475569' }}>
              Department of Computer Science and Engineering
            </p>
          </div>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1rem',
              fontWeight: 'bold',
              margin: '0 0 0.5rem 0',
              textDecoration: 'underline'
            }}>
              {coverType === 'lab' ? 'Lab Report' : 'Assignment'}
            </h2>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              margin: 0,
              color: '#374151'
            }}>
              {formData.assignment_name || 'Assignment/Lab Name'}
            </h3>
          </div>

          {/* Content */}
          <div style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Course Title:</strong> {formData.course_title || 'Course Title'}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Course Code:</strong> {formData.course_code || 'Course Code'}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>{coverType === 'lab' ? 'Lab Report No.' : 'Assignment No.'}:</strong> {formData.assignment_no || 'Number'}
            </div>
          </div>

          {/* Student Info */}
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
            fontSize: '0.75rem',
            lineHeight: '1.4'
          }}>
            <div style={{ marginBottom: '0.25rem' }}>
              <strong>Name:</strong> {formData.student_name || 'Student Name'}
            </div>
            <div style={{ marginBottom: '0.25rem' }}>
              <strong>ID:</strong> {formData.student_id || 'Student ID'}
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.25rem' }}>
              <span><strong>Batch:</strong> {formData.batch || 'Batch'}</span>
              <span><strong>Section:</strong> {formData.section || 'Section'}</span>
            </div>
            <div style={{ marginBottom: '0.25rem' }}>
              <strong>Session:</strong> {formData.session || 'Session'}
            </div>
            <div>
              <strong>Submission Date:</strong> {formData.submission_date || 'Date'}
            </div>
          </div>
        </div>
      );
    }
    
    // For other templates, show coming soon preview
    return (
      <div style={{
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        borderRadius: '0.375rem',
        padding: '2rem',
        marginBottom: '0.75rem',
        border: '1px solid rgba(148, 163, 184, 0.3)',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🚧</div>
          <h3 style={{ color: '#374151', fontSize: '1rem', margin: '0 0 0.25rem 0' }}>
            Template Preview Coming Soon
          </h3>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
            This template is under development
          </p>
        </div>
      </div>
    );
  };

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

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    
    // Auto-uppercase section field
    if (id === 'section') {
      setFormData(prev => ({ ...prev, [id]: value.toUpperCase() }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
    
    setValidationError('');
  };

  const handleCourseSearch = (e) => {
    const searchValue = e.target.value;
    setCourseSearch(searchValue);
    
    // Clear selected course when user starts typing
    if (formData.course_title && searchValue !== formData.course_title) {
      setFormData(prev => ({
        ...prev,
        course_title: '',
        course_code: ''
      }));
    }
    
    if (searchValue.trim() === '') {
      setFilteredCourses([]);
      setShowCourseDropdown(false);
      return;
    }

    const filtered = courses.filter(course => {
      const searchLower = searchValue.toLowerCase();
      return (
        course.code.toLowerCase().includes(searchLower) ||
        course.title.toLowerCase().includes(searchLower) ||
        course.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
      );
    });

    setFilteredCourses(filtered.slice(0, 8)); // Show max 8 results
    setShowCourseDropdown(filtered.length > 0);
  };

  const selectCourse = (course) => {
    setFormData(prev => ({
      ...prev,
      course_title: course.title,
      course_code: course.code
    }));
    setCourseSearch(''); // Clear search after selection
    setShowCourseDropdown(false);
    setFilteredCourses([]);
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
      student_id: '',
      batch: '',
      section: '',
      session: ''
    });
    setCoverType('');
    setOutputType('cover');
    setFile(null);
    setError('');
    setValidationError('');
    setCourseSearch('');
    setFilteredCourses([]);
    setShowCourseDropdown(false);
    setSelectedTemplate('template1');
    
    // Clear localStorage
    Object.keys(formData).forEach(key => localStorage.removeItem(key));
    localStorage.removeItem('coverType');
    localStorage.removeItem('outputType');
    localStorage.removeItem('selectedTemplate');
  };

  const validateForm = () => {
    const required = ['assignment_no', 'course_code', 'course_title', 'assignment_name', 'submission_date', 'student_name', 'student_id', 'batch', 'section', 'session'];
    
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
      formDataToSend.append('template', selectedTemplate);
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
      
      // Create filename with student ID and course short name
      const studentId = formData.student_id || 'unknown';
      
      // Find the course short name from the courses array
      const selectedCourse = courses.find(course => course.code === formData.course_code);
      const courseShortName = selectedCourse && selectedCourse.keywords.length > 0 
        ? selectedCourse.keywords[0].toUpperCase()
        : formData.course_code?.replace(/\s+/g, '').toLowerCase() || 'course';
      
      link.download = `${studentId}-(${courseShortName}).pdf`;
      
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
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0f0f 25%, #2d1515 50%, #1a0f0f 75%, #0a0a0a 100%)',
      fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
      position: 'relative'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(185, 28, 28, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite reverse'
        }} />
      </div>

      {/* Header */}
      <header style={{
        background: 'rgba(10, 10, 10, 0.9)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.1)',
        borderBottom: '1px solid rgba(220, 38, 38, 0.2)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                margin: 0,
                textShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
                fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif'
              }}>
                Welcome to Assignment BaBa
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1250px', margin: '0 auto', padding: '0.25rem', position: 'relative', zIndex: 5 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 350px',
          gap: '1rem'
        }}>
          
          {/* Main Form Card */}
          <div style={{
            background: 'rgba(20, 20, 20, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '0.5rem',
            boxShadow: '0 20px 25px -5px rgba(220, 38, 38, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
            padding: '1rem',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
          
          {/* Glass morphism overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.03) 0%, rgba(185, 28, 28, 0.01) 100%)',
            pointerEvents: 'none'
          }} />
          
          {/* Error Messages */}
          {error && (
            <div style={{
              marginBottom: '1.5rem',
              background: 'rgba(40, 20, 20, 0.8)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              borderRadius: '0.75rem',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              position: 'relative',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ color: '#ef4444', fontSize: '1.125rem' }}>⚠️</span>
              <div style={{ color: '#fca5a5', fontSize: '0.875rem' }}>{error}</div>
            </div>
          )}

          {validationError && (
            <div style={{
              marginBottom: '1.5rem',
              background: 'rgba(40, 30, 20, 0.8)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '0.75rem',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              position: 'relative',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ color: '#f59e0b', fontSize: '1.125rem' }}>⚠️</span>
              <div style={{ color: '#fbbf24', fontSize: '0.875rem' }}>{validationError}</div>
            </div>
          )}

          {/* Form Fields */}
          <div style={{ display: 'grid', gap: '1rem', position: 'relative', zIndex: 1 }}>
            
            {/* Cover Type Selection */}
            <div style={{
              background: 'rgba(30, 30, 30, 0.6)',
              borderRadius: '0.5rem',
              padding: '1rem',
              border: '1px solid rgba(75, 85, 99, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#f3f4f6',
                marginBottom: '0.75rem',
                fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📝 Select Cover Type
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                <button
                  onClick={() => setCoverType('assignment')}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: `2px solid ${coverType === 'assignment' ? '#dc2626' : 'rgba(75, 85, 99, 0.3)'}`,
                    background: coverType === 'assignment' ? 'rgba(40, 20, 20, 0.8)' : 'rgba(30, 30, 30, 0.6)',
                    color: coverType === 'assignment' ? '#fca5a5' : '#d1d5db',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    fontSize: '0.875rem',
                    backdropFilter: 'blur(10px)',
                    boxShadow: coverType === 'assignment' ? '0 0 20px rgba(220, 38, 38, 0.3)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📄</div>
                  <div style={{ fontWeight: '600' }}>Assignment</div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Regular assignments</div>
                </button>
                
                <button
                  onClick={() => setCoverType('lab')}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: `2px solid ${coverType === 'lab' ? '#dc2626' : 'rgba(75, 85, 99, 0.3)'}`,
                    background: coverType === 'lab' ? 'rgba(40, 20, 20, 0.8)' : 'rgba(30, 30, 30, 0.6)',
                    color: coverType === 'lab' ? '#fca5a5' : '#d1d5db',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    fontSize: '0.875rem',
                    backdropFilter: 'blur(10px)',
                    boxShadow: coverType === 'lab' ? '0 0 20px rgba(220, 38, 38, 0.3)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🔬</div>
                  <div style={{ fontWeight: '600' }}>Lab Report</div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Laboratory reports</div>
                </button>
              </div>
            </div>

            {/* Assignment/Lab Details Section */}
            <div style={{
              background: 'rgba(30, 30, 30, 0.6)',
              borderRadius: '0.5rem',
              padding: '1rem',
              border: '1px solid rgba(75, 85, 99, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#f3f4f6',
                marginBottom: '0.75rem',
                fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📝 {coverType === 'lab' ? 'Lab Report Details' : 'Assignment Details'}
              </h3>
              
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {/* Row 1: Assignment Name */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#f3f4f6',
                    marginBottom: '0.375rem'
                  }}>
                    📝 {coverType === 'lab' ? 'Lab Report Name' : 'Assignment Name'}
                  </label>
                  <input
                    id="assignment_name"
                    type="text"
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '2px solid rgba(75, 85, 99, 0.3)',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box',
                      background: 'rgba(30, 30, 30, 0.8)',
                      color: '#f3f4f6',
                      backdropFilter: 'blur(10px)',
                      outline: 'none',
                      fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif'
                    }}
                    placeholder="Enter descriptive name..."
                    value={formData.assignment_name || ''}
                    onChange={handleInputChange}
                    onFocus={(e) => e.target.style.border = '2px solid #dc2626'}
                    onBlur={(e) => e.target.style.border = '2px solid rgba(75, 85, 99, 0.3)'}
                    required
                  />
                </div>

                {/* Row 2: Assignment No. and Course Title */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#f3f4f6',
                      marginBottom: '0.375rem'
                    }}>
                      📄 {coverType === 'lab' ? 'Lab Report No.' : 'Assignment No.'}
                    </label>
                    <input
                      id="assignment_no"
                      type="text"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '2px solid rgba(75, 85, 99, 0.3)',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box',
                        background: 'rgba(30, 30, 30, 0.8)',
                        color: '#f3f4f6',
                        backdropFilter: 'blur(10px)',
                        outline: 'none',
                        fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif'
                      }}
                      placeholder="Enter number..."
                      value={formData.assignment_no || ''}
                      onChange={handleInputChange}
                      onFocus={(e) => e.target.style.border = '2px solid #dc2626'}
                      onBlur={(e) => e.target.style.border = '2px solid rgba(75, 85, 99, 0.3)'}
                      required
                    />
                  </div>
                  
                  <div style={{ position: 'relative' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#f3f4f6',
                      marginBottom: '0.375rem'
                    }}>
                      📚 Course Title
                    </label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '2px solid rgba(75, 85, 99, 0.3)',
                        borderRadius: '0.75rem',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box',
                        background: 'rgba(30, 30, 30, 0.8)',
                        color: '#f3f4f6',
                        backdropFilter: 'blur(10px)',
                        outline: 'none',
                        fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif'
                      }}
                      placeholder="Search course (e.g., 'oop', 'database', 'CSE 211')..."
                      value={formData.course_title || courseSearch}
                      onChange={handleCourseSearch}
                      onFocus={(e) => {
                        e.target.style.border = '2px solid #dc2626';
                        if (filteredCourses.length > 0) setShowCourseDropdown(true);
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '2px solid rgba(75, 85, 99, 0.3)';
                        // Delay hiding dropdown to allow selection
                        setTimeout(() => setShowCourseDropdown(false), 200);
                      }}
                    />
                    
                    {/* Course Search Dropdown */}
                    {showCourseDropdown && filteredCourses.length > 0 && (
                      <div 
                        className="course-dropdown"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          background: 'rgba(20, 20, 20, 0.95)',
                          border: '2px solid rgba(220, 38, 38, 0.3)',
                          borderRadius: '0.75rem',
                          backdropFilter: 'blur(20px)',
                          zIndex: 1000,
                          maxHeight: '300px',
                          overflowY: 'auto',
                          marginTop: '0.25rem',
                          boxShadow: '0 10px 25px rgba(220, 38, 38, 0.2)'
                        }}>
                        {filteredCourses.map((course, index) => (
                          <div
                            key={course.code}
                            style={{
                              padding: '0.75rem 1rem',
                              cursor: 'pointer',
                              borderBottom: index < filteredCourses.length - 1 ? '1px solid rgba(75, 85, 99, 0.2)' : 'none',
                              transition: 'all 0.2s',
                              fontSize: '0.875rem'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'rgba(220, 38, 38, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'transparent';
                            }}
                            onMouseDown={() => selectCourse(course)}
                          >
                            <div style={{ color: '#fca5a5', fontWeight: '600', marginBottom: '0.25rem' }}>
                              {course.code}
                            </div>
                            <div style={{ color: '#d1d5db', fontSize: '0.8rem' }}>
                              {course.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 3: Submission Date */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#f3f4f6',
                    marginBottom: '0.375rem'
                  }}>
                    📅 Submission Date
                  </label>
                  <input
                    id="submission_date"
                    type="date"
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      padding: '0.5rem',
                      border: '2px solid rgba(75, 85, 99, 0.3)',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box',
                      background: 'rgba(30, 30, 30, 0.8)',
                      color: '#f3f4f6',
                      backdropFilter: 'blur(10px)',
                      outline: 'none'
                    }}
                    value={formData.submission_date || ''}
                    onChange={handleInputChange}
                    onFocus={(e) => e.target.style.border = '2px solid #dc2626'}
                    onBlur={(e) => e.target.style.border = '2px solid rgba(75, 85, 99, 0.3)'}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Output Options Section */}
            <div style={{
              background: 'rgba(30, 30, 30, 0.6)',
              borderRadius: '0.5rem',
              padding: '1rem',
              border: '1px solid rgba(75, 85, 99, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#f3f4f6',
                marginBottom: '0.75rem',
                fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📤 Output Options
              </h3>
              
              {/* Output Type Selection */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#f3f4f6',
                  marginBottom: '0.375rem'
                }}>
                  ✅ Output Type
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  <button
                    onClick={() => selectOutputType('cover')}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: `2px solid ${outputType === 'cover' ? '#dc2626' : 'rgba(75, 85, 99, 0.3)'}`,
                      background: outputType === 'cover' ? 'rgba(40, 20, 20, 0.8)' : 'rgba(30, 30, 30, 0.6)',
                      color: outputType === 'cover' ? '#fca5a5' : '#d1d5db',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      fontSize: '0.75rem',
                      backdropFilter: 'blur(10px)',
                      boxShadow: outputType === 'cover' ? '0 0 20px rgba(220, 38, 38, 0.3)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>📄</div>
                    <div style={{ fontWeight: '600' }}>Cover Page Only</div>
                    <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>Just the cover page</div>
                  </button>
                  <button
                    onClick={() => selectOutputType('merged')}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: `2px solid ${outputType === 'merged' ? '#dc2626' : 'rgba(75, 85, 99, 0.3)'}`,
                      background: outputType === 'merged' ? 'rgba(40, 20, 20, 0.8)' : 'rgba(30, 30, 30, 0.6)',
                      color: outputType === 'merged' ? '#fca5a5' : '#d1d5db',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      fontSize: '0.75rem',
                      backdropFilter: 'blur(10px)',
                      boxShadow: outputType === 'merged' ? '0 0 20px rgba(220, 38, 38, 0.3)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>📤</div>
                    <div style={{ fontWeight: '600' }}>Complete Assignment</div>
                    <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>Cover + uploaded file</div>
                  </button>
                </div>
              </div>

              {/* File Upload */}
              {outputType === 'merged' && (
                <div style={{
                  background: 'rgba(20, 20, 20, 0.6)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  border: '2px dashed rgba(220, 38, 38, 0.4)',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>📤</div>
                  <label htmlFor="assignment_file" style={{ cursor: 'pointer' }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.75rem',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-block',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
                    }}>
                      Choose File (PDF, DOC, DOCX)
                    </span>
                    <input
                      id="assignment_file"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      style={{ display: 'none' }}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                  {file && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#f3f4f6' }}>
                      📄 {file.name}
                    </div>
                  )}
                  <p style={{ fontSize: '0.65rem', color: '#9ca3af', marginTop: '0.25rem', margin: '0.25rem 0 0 0' }}>
                    Upload your assignment file (PDF, DOC, DOCX) to merge with cover page
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="action-buttons" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.5rem', 
                paddingTop: '0.5rem'
              }}>
                <button
                  onClick={generatePDF}
                  disabled={isLoading}
                  style={{
                    flex: '1',
                    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1,
                    transition: 'all 0.2s',
                    boxShadow: '0 8px 25px rgba(220, 38, 38, 0.4)',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem'
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
                    padding: '0.5rem 1rem',
                    border: '2px solid rgba(75, 85, 99, 0.4)',
                    color: '#d1d5db',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    background: 'rgba(30, 30, 30, 0.6)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span>↺</span>
                  <span>Clear All</span>
                </button>
              </div>
            </div>
          </div>
        </div>
          
          {/* Right Sidebar */}
          <div style={{ display: 'grid', gap: '1rem' }}>
            
            {/* Student Information Section */}
            <div style={{
              background: 'rgba(20, 20, 20, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '0.5rem',
              boxShadow: '0 20px 25px -5px rgba(220, 38, 38, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
              padding: '1rem',
              border: '1px solid rgba(220, 38, 38, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Glass morphism overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.03) 0%, rgba(185, 28, 28, 0.01) 100%)',
                pointerEvents: 'none'
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#f3f4f6',
                  marginBottom: '0.75rem',
                  fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textAlign: 'center'
                }}>
                  👤 Student Information
                </h3>
                
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {/* Student Name */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#f3f4f6',
                      marginBottom: '0.375rem'
                    }}>
                      👤 Student Name
                    </label>
                    <input
                      id="student_name"
                      type="text"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '2px solid rgba(75, 85, 99, 0.3)',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box',
                        background: 'rgba(30, 30, 30, 0.8)',
                        color: '#f3f4f6',
                        backdropFilter: 'blur(10px)',
                        outline: 'none'
                      }}
                      placeholder="Enter full name..."
                      value={formData.student_name || ''}
                      onChange={handleInputChange}
                      onFocus={(e) => e.target.style.border = '2px solid #dc2626'}
                      onBlur={(e) => e.target.style.border = '2px solid rgba(75, 85, 99, 0.3)'}
                      required
                    />
                  </div>
                  
                  {/* Student ID */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#f3f4f6',
                      marginBottom: '0.375rem'
                    }}>
                      🆔 Student ID
                    </label>
                    <input
                      id="student_id"
                      type="text"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '2px solid rgba(75, 85, 99, 0.3)',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box',
                        background: 'rgba(30, 30, 30, 0.8)',
                        color: '#f3f4f6',
                        backdropFilter: 'blur(10px)',
                        outline: 'none'
                      }}
                      placeholder="Enter ID..."
                      value={formData.student_id || ''}
                      onChange={handleInputChange}
                      onFocus={(e) => e.target.style.border = '2px solid #dc2626'}
                      onBlur={(e) => e.target.style.border = '2px solid rgba(75, 85, 99, 0.3)'}
                      required
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#f3f4f6',
                      marginBottom: '0.375rem'
                    }}>
                      �️ Department
                    </label>
                    <input
                      id="department"
                      type="text"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '2px solid rgba(75, 85, 99, 0.3)',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box',
                        background: 'rgba(30, 30, 30, 0.8)',
                        color: '#f3f4f6',
                        backdropFilter: 'blur(10px)',
                        outline: 'none'
                      }}
                      placeholder="Enter department..."
                      value={formData.department || ''}
                      onChange={handleInputChange}
                      onFocus={(e) => e.target.style.border = '2px solid #dc2626'}
                      onBlur={(e) => e.target.style.border = '2px solid rgba(75, 85, 99, 0.3)'}
                      required
                    />
                  </div>

                  {/* Batch, Section, Session in one row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        color: '#f3f4f6',
                        marginBottom: '0.25rem'
                      }}>
                        📋 Batch
                      </label>
                      <input
                        id="batch"
                        type="text"
                        style={{
                          width: '100%',
                          padding: '0.4rem',
                          border: '2px solid rgba(75, 85, 99, 0.3)',
                          borderRadius: '0.4rem',
                          fontSize: '0.7rem',
                          transition: 'all 0.2s',
                          boxSizing: 'border-box',
                          background: 'rgba(30, 30, 30, 0.8)',
                          color: '#f3f4f6',
                          backdropFilter: 'blur(10px)',
                          outline: 'none'
                        }}
                        placeholder="e.g., 60"
                        value={formData.batch || ''}
                        onChange={handleInputChange}
                        onFocus={(e) => e.target.style.border = '2px solid #dc2626'}
                        onBlur={(e) => e.target.style.border = '2px solid rgba(75, 85, 99, 0.3)'}
                        required
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        color: '#f3f4f6',
                        marginBottom: '0.25rem'
                      }}>
                        � Section
                      </label>
                      <input
                        id="section"
                        type="text"
                        style={{
                          width: '100%',
                          padding: '0.4rem',
                          border: '2px solid rgba(75, 85, 99, 0.3)',
                          borderRadius: '0.4rem',
                          fontSize: '0.7rem',
                          transition: 'all 0.2s',
                          boxSizing: 'border-box',
                          background: 'rgba(30, 30, 30, 0.8)',
                          color: '#f3f4f6',
                          backdropFilter: 'blur(10px)',
                          outline: 'none'
                        }}
                        placeholder="e.g., A"
                        value={formData.section || ''}
                        onChange={handleInputChange}
                        onFocus={(e) => e.target.style.border = '2px solid #dc2626'}
                        onBlur={(e) => e.target.style.border = '2px solid rgba(75, 85, 99, 0.3)'}
                        required
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        color: '#f3f4f6',
                        marginBottom: '0.25rem'
                      }}>
                        📆 Session
                      </label>
                      <input
                        id="session"
                        type="text"
                        style={{
                          width: '100%',
                          padding: '0.4rem',
                          border: '2px solid rgba(75, 85, 99, 0.3)',
                          borderRadius: '0.4rem',
                          fontSize: '0.7rem',
                          transition: 'all 0.2s',
                          boxSizing: 'border-box',
                          background: 'rgba(30, 30, 30, 0.8)',
                          color: '#f3f4f6',
                          backdropFilter: 'blur(10px)',
                          outline: 'none'
                        }}
                        placeholder="2021-22"
                        value={formData.session || ''}
                        onChange={handleInputChange}
                        onFocus={(e) => e.target.style.border = '2px solid #dc2626'}
                        onBlur={(e) => e.target.style.border = '2px solid rgba(75, 85, 99, 0.3)'}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Template Style Section */}
            <div style={{
              background: 'rgba(20, 20, 20, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '0.5rem',
              boxShadow: '0 20px 25px -5px rgba(220, 38, 38, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
              padding: '1rem',
              border: '1px solid rgba(220, 38, 38, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Glass morphism overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.03) 0%, rgba(185, 28, 28, 0.01) 100%)',
                pointerEvents: 'none'
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#f3f4f6',
                  marginBottom: '0.75rem',
                  fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textAlign: 'center'
                }}>
                  🎨 Template Style
                </h3>

                {/* 2x2 Template Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {/* Template 1 - Modern */}
                  <div
                    style={{
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: selectedTemplate === 'template1' ? '2px solid #dc2626' : '2px solid rgba(75, 85, 99, 0.3)',
                      background: selectedTemplate === 'template1' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(20, 20, 20, 0.8)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backdropFilter: 'blur(10px)',
                      textAlign: 'center'
                    }}
                    onClick={() => setSelectedTemplate('template1')}
                    onMouseEnter={(e) => {
                      if (selectedTemplate !== 'template1') {
                        e.target.style.background = 'rgba(75, 85, 99, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTemplate !== 'template1') {
                        e.target.style.background = 'rgba(20, 20, 20, 0.8)';
                      }
                    }}
                  >
                    <div style={{
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      color: selectedTemplate === 'template1' ? '#fca5a5' : '#f3f4f6',
                      marginBottom: '0.25rem'
                    }}>
                      Modern
                    </div>
                    <div style={{
                      fontSize: '0.6rem',
                      color: '#9ca3af'
                    }}>
                      Clean & Professional
                    </div>
                  </div>

                  {/* Template 2 - Coming Soon */}
                  <div
                    style={{
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '2px solid rgba(75, 85, 99, 0.3)',
                      background: 'rgba(20, 20, 20, 0.5)',
                      textAlign: 'center',
                      opacity: '0.6'
                    }}
                  >
                    <div style={{
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      color: '#9ca3af',
                      marginBottom: '0.25rem'
                    }}>
                      Classic
                    </div>
                    <div style={{
                      fontSize: '0.6rem',
                      color: '#6b7280'
                    }}>
                      Coming Soon
                    </div>
                  </div>

                  {/* Template 3 - Coming Soon */}
                  <div
                    style={{
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '2px solid rgba(75, 85, 99, 0.3)',
                      background: 'rgba(20, 20, 20, 0.5)',
                      textAlign: 'center',
                      opacity: '0.6'
                    }}
                  >
                    <div style={{
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      color: '#9ca3af',
                      marginBottom: '0.25rem'
                    }}>
                      Minimal
                    </div>
                    <div style={{
                      fontSize: '0.6rem',
                      color: '#6b7280'
                    }}>
                      Coming Soon
                    </div>
                  </div>

                  {/* Template 4 - Coming Soon */}
                  <div
                    style={{
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '2px solid rgba(75, 85, 99, 0.3)',
                      background: 'rgba(20, 20, 20, 0.5)',
                      textAlign: 'center',
                      opacity: '0.6'
                    }}
                  >
                    <div style={{
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      color: '#9ca3af',
                      marginBottom: '0.25rem'
                    }}>
                      Creative
                    </div>
                    <div style={{
                      fontSize: '0.6rem',
                      color: '#6b7280'
                    }}>
                      Coming Soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>      {/* Footer */}
      <footer style={{
        background: 'rgba(20, 20, 20, 0.95)',
        color: '#f3f4f6',
        padding: '1rem',
        marginTop: '1rem',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(220, 38, 38, 0.2)'
      }}>
        <div style={{ maxWidth: '1250px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
            <span style={{ fontWeight: '600', color: '#fca5a5', fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif' }}>Assignment BaBa</span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0, textAlign: 'center' }}>
            © 2025 Developed by Rahexa
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        button:hover {
          transform: translateY(-1px);
          filter: brightness(1.1);
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #dc2626 !important;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2) !important;
        }
        
        @media (max-width: 768px) {
          .footer-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }

        /* Action buttons responsive layout */
        @media (min-width: 640px) {
          .action-buttons {
            flex-direction: row !important;
          }
        }

        /* Custom scrollbar for dark theme */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(30, 30, 30, 0.8);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 38, 38, 0.8);
        }

        /* Course dropdown scrollbar */
        .course-dropdown::-webkit-scrollbar {
          width: 6px;
        }
        
        .course-dropdown::-webkit-scrollbar-track {
          background: rgba(30, 30, 30, 0.8);
        }
        
        .course-dropdown::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.6);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}

export default App;

