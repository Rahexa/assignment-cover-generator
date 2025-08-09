import { useState, useEffect } from 'react';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.min.mjs';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  FaExclamationTriangle, 
  FaEye, 
  FaDownload, 
  FaFileAlt, 
  FaUpload, 
  FaUndo, 
  FaGraduationCap, 
  FaCalendarAlt, 
  FaUser, 
  FaIdCard, 
  FaCheckCircle,
  FaCode,
  FaBook,
  FaFileUpload,
  FaPalette,
  FaRocket,
  FaLightbulb,
  FaSparkles
} from 'react-icons/fa';
import './App.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.7.76/pdf.worker.min.mjs';

const courses = [
  { code: "CSE 110", title: "Introduction to Computer System Laboratory" },
  { code: "CSE 111", title: "Structured Programming" },
  { code: "CSE 112", title: "Structured Programming Laboratory" },
  { code: "EEE 101", title: "Electrical Circuits I" },
  { code: "EEE 102", title: "Electrical Circuits I Laboratory" },
  { code: "ENG 101", title: "General English" },
  { code: "MAT 105", title: "Engineering Mathematics I" },
  { code: "ME 102", title: "Mechanical Engineering Drawing & CAD Laboratory" },
  { code: "CSE 103", title: "Discrete Mathematics" },
  { code: "CSE 221", title: "Data Structure" },
  { code: "CSE 222", title: "Data Structure Laboratory" },
  { code: "ECO 201", title: "Basic Economics" },
  { code: "EEE 211", title: "Electronics I" },
  { code: "EEE 212", title: "Electronics I Laboratory" },
  { code: "PHY 101", title: "Engineering Physics I" },
  { code: "CSE 211", title: "Object Oriented Programming" },
  { code: "CSE 212", title: "Object Oriented Programming Laboratory" },
  { code: "CSE 302", title: "Computational Methods for Engineering Problems Laboratory" },
  { code: "EEE 311", title: "Digital Electronics" },
  { code: "EEE 312", title: "Digital Electronics Laboratory" },
  { code: "ENG 103", title: "Developing English Skills" },
  { code: "MAT 201", title: "Engineering Mathematics III" },
  { code: "CSE 225", title: "Algorithm Design And Analysis" },
  { code: "CSE 226", title: "Algorithm Design And Analysis Laboratory" },
  { code: "CSE 237", title: "Database Management System" },
  { code: "CSE 238", title: "Database Management System Laboratory" },
  { code: "EEE 371", title: "Microprocessors & Microcontrollers" },
  { code: "EEE 372", title: "Microprocessors & Microcontrollers Laboratory" },
  { code: "MAT 203", title: "Engineering Mathematics IV" },
  { code: "CSE 317", title: "Artificial Intelligence" },
  { code: "CSE 318", title: "Artificial Intelligence Laboratory" },
  { code: "CSE 333", title: "Operating Systems" },
  { code: "CSE 334", title: "Operating Systems Laboratory" },
  { code: "CSE 337", title: "Computer Organization & Architecture" },
  { code: "CSE 305", title: "Software Engineering & Information System Design" },
  { code: "CSE 306", title: "Software Engineering & Information System Design Laboratory" },
  { code: "CSE 338", title: "Software Development" },
  { code: "CSE 364", title: "Data Communication" },
  { code: "CSE 367", title: "Computer Network" },
  { code: "CSE 368", title: "Computer Network Laboratory" },
  { code: "CSE 437", title: "Network and Computer Security" },
  { code: "CSE 309", title: "Theory of Computation" },
  { code: "CSE 451", title: "Neural Network & Fuzzy Logic" },
  { code: "CSE 452", title: "Neural Network & Fuzzy Logic Laboratory" },
  { code: "CSE 455", title: "Computer Graphics & Image Processing" },
  { code: "CSE 456", title: "Computer Graphics & Image Processing Laboratory" },
  { code: "EEE 313", title: "Control Systems" },
  { code: "EEE 314", title: "Control Systems Laboratory" },
  { code: "ENG 401", title: "Technical Writing & Presentation" },
  { code: "CSE 453", title: "Compiler Construction" },
  { code: "CSE 454", title: "Compiler Construction Laboratory" },
  { code: "CSE 457", title: "Machine Learning" },
  { code: "CSE 458", title: "Machine Learning Laboratory" },
  { code: "CSE 459", title: "Pattern Recognition" },
  { code: "CSE 460", title: "Pattern Recognition Laboratory" },
  { code: "CSE 481", title: "Contemporary Course of Computer Science" },
  { code: "CSE 482", title: "Contemporary Course of Computer Science Laboratory" }
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
  const [showPreview, setShowPreview] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [previewPages, setPreviewPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  let choicesInstance = null;

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

  // Initialize course dropdown when cover type changes
  useEffect(() => {
    if (coverType) {
      initializeCourseDropdown();
    }
  }, [coverType]);

  const initializeCourseDropdown = () => {
    const selectElement = document.getElementById('course_title');
    if (selectElement && !choicesInstance) {
      // Clear existing options
      selectElement.innerHTML = '<option value="" disabled>Select Course Title</option>';
      
      // Add courses with custom properties for code extraction
      courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.title;
        option.textContent = `${course.code} - ${course.title}`;
        option.setAttribute('data-code', course.code);
        selectElement.appendChild(option);
      });

      choicesInstance = new Choices(selectElement, {
        searchEnabled: true,
        itemSelectText: '',
        noResultsText: 'No courses found',
        searchPlaceholderValue: 'Search courses...',
        classNames: {
          containerInner: 'choices__inner choices__inner--custom',
        }
      });

      selectElement.addEventListener('change', (e) => {
        const selectedOption = e.target.selectedOptions[0];
        const courseCode = selectedOption ? selectedOption.getAttribute('data-code') : '';
        
        setFormData(prev => ({
          ...prev,
          course_title: e.target.value,
          course_code: courseCode
        }));
      });
    }
  };

  const updateCoverType = (type) => {
    setCoverType(type);
    // Destroy existing choices instance
    if (choicesInstance) {
      choicesInstance.destroy();
      choicesInstance = null;
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setValidationError('');
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
    
    // Reset course dropdown
    if (choicesInstance) {
      choicesInstance.destroy();
      choicesInstance = null;
    }
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
      
      // Validate PDF structure
      try {
        const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
        console.log(`✅ PDF validation successful: ${pdf.numPages} pages`);
        
        if (pdf.numPages === 0) {
          throw new Error('Generated PDF is empty');
        }
      } catch (validationError) {
        console.error('❌ PDF validation failed:', validationError);
        throw new Error(`Generated PDF is invalid: ${validationError.message}`);
      }
      
      setPdfData(uint8Array);
      setShowPreview(true);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError(`Failed to generate PDF: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPDFPreview = async () => {
    if (!pdfData) return;

    try {
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      const pages = [];

      for (let pageNum = 1; pageNum <= Math.min(pdf.numPages, 5); pageNum++) {
        const page = await pdf.getPage(pageNum);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;

        pages.push({ pageNum, canvas });
      }

      setPreviewPages(pages);
    } catch (error) {
      console.error('Error rendering PDF preview:', error);
      setError(`Error rendering PDF preview: ${error.message}`);
    }
  };

  useEffect(() => {
    if (showPreview && pdfData) {
      renderPDFPreview();
    }
  }, [showPreview, pdfData]);

  const downloadPDF = () => {
    if (!pdfData) return;
    
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${coverType}_cover_${formData.student_name || 'student'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Assignment Cover Generator
                </h1>
                <p className="text-gray-600 text-sm">Create professional cover pages instantly</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaSparkles className="text-yellow-500 text-lg animate-pulse" />
              <span className="text-sm text-gray-600 font-medium">Premier University</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Features Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <FaLightbulb className="text-yellow-500 text-xl" />
                <h3 className="text-lg font-bold text-gray-800">Features</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <FaCheckCircle className="text-green-500" />
                  <span>Professional PDF Generation</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <FaCheckCircle className="text-green-500" />
                  <span>Responsive Design</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <FaCheckCircle className="text-green-500" />
                  <span>Auto-save Form Data</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <FaCheckCircle className="text-green-500" />
                  <span>Course Search & Selection</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <FaRocket className="text-2xl" />
                <h3 className="text-lg font-bold">Quick Stats</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm opacity-90">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm opacity-90">Cover Types</div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <FaPalette className="text-pink-500 text-xl" />
                <h3 className="text-lg font-bold text-gray-800">Pro Tips</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Use descriptive assignment names</p>
                <p>• Double-check student information</p>
                <p>• Preview before downloading</p>
                <p>• Upload PDFs for complete assignments</p>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              
              {/* Error Messages */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                  <FaExclamationTriangle className="text-red-500 text-lg flex-shrink-0" />
                  <div className="text-red-700 text-sm">{error}</div>
                </div>
              )}

              {validationError && (
                <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center space-x-3">
                  <FaExclamationTriangle className="text-amber-500 text-lg flex-shrink-0" />
                  <div className="text-amber-700 text-sm">{validationError}</div>
                </div>
              )}

              {/* Cover Type Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <FaFileAlt className="inline mr-2 text-indigo-500" />
                  Cover Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => updateCoverType('assignment')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      coverType === 'assignment'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    <FaFileAlt className="text-2xl mb-2 mx-auto" />
                    <div className="font-semibold">Assignment</div>
                    <div className="text-xs text-gray-500">Regular assignments</div>
                  </button>
                  <button
                    onClick={() => updateCoverType('lab')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      coverType === 'lab'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <FaCode className="text-2xl mb-2 mx-auto" />
                    <div className="font-semibold">Lab Report</div>
                    <div className="text-xs text-gray-500">Laboratory work</div>
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              {coverType && (
                <div className="space-y-6">
                  
                  {/* Row 1 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaFileAlt className="inline mr-2 text-indigo-500" />
                        {coverType === 'lab' ? 'Lab Report No.' : 'Assignment No.'}
                      </label>
                      <input
                        id="assignment_no"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter number..."
                        value={formData.assignment_no}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaBook className="inline mr-2 text-purple-500" />
                        Course Title
                      </label>
                      <select
                        id="course_title"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        value={formData.course_title}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Select Course Title</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaFileAlt className="inline mr-2 text-green-500" />
                      {coverType === 'lab' ? 'Lab Report Name' : 'Assignment Name'}
                    </label>
                    <input
                      id="assignment_name"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter descriptive name..."
                      value={formData.assignment_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Row 3 */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaCalendarAlt className="inline mr-2 text-blue-500" />
                        Submission Date
                      </label>
                      <input
                        id="submission_date"
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={formData.submission_date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaUser className="inline mr-2 text-pink-500" />
                        Student Name
                      </label>
                      <input
                        id="student_name"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter full name..."
                        value={formData.student_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaIdCard className="inline mr-2 text-orange-500" />
                        Student ID
                      </label>
                      <input
                        id="student_id"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter ID..."
                        value={formData.student_id}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Output Type Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <FaCheckCircle className="inline mr-2 text-green-500" />
                      Output Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => selectOutputType('cover')}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          outputType === 'cover'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                        }`}
                      >
                        <FaFileAlt className="text-xl mb-2 mx-auto" />
                        <div className="font-semibold">Cover Page Only</div>
                        <div className="text-xs text-gray-500">Just the cover page</div>
                      </button>
                      <button
                        onClick={() => selectOutputType('merged')}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          outputType === 'merged'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <FaFileUpload className="text-xl mb-2 mx-auto" />
                        <div className="font-semibold">Complete Assignment</div>
                        <div className="text-xs text-gray-500">Cover + uploaded file</div>
                      </button>
                    </div>
                  </div>

                  {/* File Upload */}
                  {outputType === 'merged' && (
                    <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <FaUpload className="mx-auto text-3xl text-gray-400 mb-4" />
                        <label htmlFor="assignment_file" className="cursor-pointer">
                          <span className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-200 inline-block">
                            Choose PDF File
                          </span>
                          <input
                            id="assignment_file"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </label>
                        {file && (
                          <div className="mt-3 text-sm text-gray-600">
                            <FaFileAlt className="inline mr-2" />
                            {file.name}
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">Upload your assignment PDF to merge with cover page</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                      onClick={generatePDF}
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Generating...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <FaRocket />
                          <span>Generate Cover Page</span>
                        </div>
                      )}
                    </button>
                    
                    <button
                      onClick={clearAllData}
                      className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                      <FaUndo className="inline mr-2" />
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* PDF Preview Modal */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
          <Modal.Title className="flex items-center space-x-2">
            <FaEye />
            <span>PDF Preview</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-50 max-h-96 overflow-y-auto">
          {previewPages.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading preview...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {previewPages.map(page => (
                <div key={page.pageNum} className="text-center">
                  <div className="bg-white p-4 rounded-lg shadow-lg inline-block">
                    <canvas 
                      ref={el => el && el.replaceWith(page.canvas)} 
                      className="max-w-full h-auto border border-gray-200 rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Page {page.pageNum}</p>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-white border-0">
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowPreview(false)}
            className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={downloadPDF}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 border-0 hover:from-indigo-700 hover:to-purple-700"
          >
            <FaDownload className="mr-2" />
            Download PDF
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FaGraduationCap className="text-indigo-400 text-xl" />
            <span className="font-semibold">Assignment Cover Generator</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Premier University - Department of Computer Science & Engineering
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-400">
            <span className="flex items-center space-x-1">
              <FaSparkles className="text-yellow-400" />
              <span>Professional PDF Generation</span>
            </span>
            <span>•</span>
            <span>Modern & Responsive Design</span>
            <span>•</span>
            <span>Built with React</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
