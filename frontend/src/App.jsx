import { useState, useEffect } from 'react';
import { Choices } from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.min.mjs';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaExclamationTriangle, FaEye, FaDownload, FaFileAlt, FaUpload, FaUndo, FaGraduationCap, FaCalendarAlt, FaUser, FaIdCard, FaCheckCircle } from 'react-icons/fa';
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
  const [coverType, setCoverType] = useState('');
  const [formData, setFormData] = useState({
    assignment_no: '',
    course_title: '',
    assignment_name: '',
    submission_date: '',
    student_name: '',
    student_id: ''
  });
  const [outputType, setOutputType] = useState('');
  const [file, setFile] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewPages, setPreviewPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const courseSelect = document.getElementById('course_title');
    const choices = new Choices(courseSelect, {
      searchEnabled: true,
      searchChoices: true,
      itemSelectText: '',
      placeholderValue: 'Select Course Title',
      searchPlaceholderValue: 'Search Course Title',
      choices: courses.map(course => ({
        value: course.title,
        label: `${course.title} - ${course.code}`,
        customProperties: { code: course.code }
      })),
      shouldSort: false
    });
    choices.disable();

    const savedData = JSON.parse(localStorage.getItem('assignmentBabaFormData') || '{}');
    setFormData(prev => ({
      ...prev,
      student_name: savedData.student_name || '',
      student_id: savedData.student_id || ''
    }));

    return () => choices.destroy();
  }, []);

  const updateCoverType = (value) => {
    setCoverType(value);
    const courseSelect = document.getElementById('course_title');
    const choices = Choices.getChoiceById(courseSelect);
    if (value) {
      choices.enable();
      document.querySelectorAll('.form-control').forEach(input => input.disabled = false);
    } else {
      choices.disable();
      setFormData(prev => ({
        ...prev,
        assignment_no: '',
        course_title: '',
        assignment_name: '',
        submission_date: '',
        student_name: prev.student_name,
        student_id: prev.student_id
      }));
      setOutputType('');
      setFile(null);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    if (id === 'student_name' || id === 'student_id') {
      localStorage.setItem('assignmentBabaFormData', JSON.stringify({
        ...JSON.parse(localStorage.getItem('assignmentBabaFormData') || '{}'),
        [id]: value
      }));
    }
  };

  const selectOutputType = (value) => {
    setOutputType(value);
  };

  const resetForm = () => {
    setCoverType('');
    setFormData({
      assignment_no: '',
      course_title: '',
      assignment_name: '',
      submission_date: '',
      student_name: '',
      student_id: ''
    });
    setOutputType('');
    setFile(null);
    setPdfBlob(null);
    const courseSelect = document.getElementById('course_title');
    const choices = Choices.getChoiceById(courseSelect);
    choices.setChoiceByValue('');
    choices.disable();
  };

  const renderPDFPreview = async (blob) => {
    try {
      setIsLoading(true);
      const url = URL.createObjectURL(blob);
      const pdf = await pdfjsLib.getDocument(url).promise;
      const pages = [];
      const modalWidth = Math.min(window.innerWidth * 0.8, 600);

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d', { alpha: false });
        const viewport = page.getViewport({ scale: 1.0 });
        const scale = modalWidth / viewport.width;

        canvas.height = viewport.height * scale;
        canvas.width = viewport.width * scale;

        await page.render({
          canvasContext: context,
          viewport: page.getViewport({ scale })
        }).promise;

        pages.push({ canvas, pageNum });
      }

      setPreviewPages(pages);
      setShowPreview(true);
      URL.revokeObjectURL(url);
    } catch (error) {
      setWarningMessage(`Failed to render PDF preview: ${error.message}`);
      setShowWarning(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (!coverType) {
        setWarningMessage('Please select a cover type.');
        setShowWarning(true);
        return;
      }
      if (!outputType) {
        setWarningMessage('Please select an output type.');
        setShowWarning(true);
        return;
      }
      if (outputType === 'merged' && !file) {
        setWarningMessage('Please upload a PDF for the complete assignment.');
        setShowWarning(true);
        return;
      }
      const requiredFields = ['assignment_no', 'course_title', 'assignment_name', 'submission_date', 'student_name', 'student_id'];
      if (!requiredFields.every(field => formData[field])) {
        setWarningMessage('Please fill out all required fields.');
        setShowWarning(true);
        return;
      }

      const selectedCourse = courses.find(course => course.title === formData.course_title);
      const data = new FormData();
      data.append('coverType', coverType);
      data.append('assignment_no', formData.assignment_no);
      data.append('course_code', selectedCourse ? selectedCourse.code : '');
      data.append('course_title', formData.course_title);
      data.append('assignment_name', formData.assignment_name);
      data.append('submission_date', formData.submission_date);
      data.append('student_name', formData.student_name);
      data.append('student_id', formData.student_id);
      data.append('outputType', outputType);
      if (file) data.append('assignment_file', file);

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: data
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate PDF');
      }

      const blob = await response.blob();
      setPdfBlob(blob);
      await renderPDFPreview(blob);
    } catch (error) {
      setWarningMessage(error.message || 'Failed to generate PDF.');
      setShowWarning(true);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!pdfBlob) {
      setWarningMessage('No PDF available to download.');
      setShowWarning(true);
      return;
    }
    const safeStudentId = formData.student_id.replace(/[^a-zA-Z0-9-_]/g, '') || 'assignment';
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeStudentId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-r from-[#3b0000] to-[#0a0a0a] text-[#f8d7da] font-inter">
      {/* Warning Modal */}
      <Modal show={showWarning} onHide={() => setShowWarning(false)} centered>
        <Modal.Header className="bg-[#1c0000] border-[#5a0000] text-[#f8d7da]">
          <Modal.Title><FaExclamationTriangle className="me-1" /> Warning</Modal.Title>
          <Button variant="close" className="filter-invert brightness-150" onClick={() => setShowWarning(false)} />
        </Modal.Header>
        <Modal.Body className="bg-[#1c0000] text-[#f8d7da] text-center">{warningMessage}</Modal.Body>
        <Modal.Footer className="bg-[#1c0000] border-[#5a2e2e]">
          <Button variant="primary" className="bg-gradient-to-r from-[#dc2626] to-[#f87171] hover:from-[#b91c1c] hover:to-[#dc2626]" onClick={() => setShowWarning(false)}>OK</Button>
        </Modal.Footer>
      </Modal>

      {/* Preview Modal */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
        <Modal.Header className="bg-[#1c0000] border-[#5a2e2e] text-[#f8d7da]">
          <Modal.Title><FaEye className="me-1" /> Preview {outputType === 'merged' ? 'Complete Assignment' : 'Cover Page'}</Modal.Title>
          <Button variant="close" className="filter-invert brightness-150" onClick={() => setShowPreview(false)} />
        </Modal.Header>
        <Modal.Body className="bg-[#1c0000] text-[#f8d7da] max-h-[500px] overflow-y-auto">
          {isLoading ? (
            <div className="text-center">Loading PDF preview...</div>
          ) : (
            previewPages.map(page => (
              <div key={page.pageNum} className="text-center">
                <canvas className="max-w-full mb-4 border border-[#5a2e2e] rounded bg-white shadow" ref={el => el && (el.replaceWith(page.canvas))} />
                <div className="text-sm">Page {page.pageNum}</div>
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer className="bg-[#1c0000] border-[#5a2e2e]">
          <Button variant="outline-secondary" className="border-[#5a2e2e] text-[#f8d7da] hover:bg-[#3a2a2a] hover:border-[#dc2626]" onClick={() => setShowPreview(false)}>Cancel</Button>
          <Button variant="primary" className="bg-gradient-to-r from-[#dc2626] to-[#f87171] hover:from-[#b91c1c] hover:to-[#dc2626]" onClick={downloadPDF}>
            <FaDownload className="me-1" /> Download PDF
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Main Content */}
      <div className="container max-w-[600px] flex-grow">
        <h1 className="title text-4xl font-bold uppercase text-center mb-4 text-[#f8d7da] shadow-md">Welcome to Assignment BaBa</h1>
        <div className="card bg-[#1c0000] rounded-lg p-4 shadow-lg border border-[#5a0000] max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="dashboard-grid grid grid-cols-2 gap-2">
            <div className="cover-type-select col-span-2">
              <label className="form-label font-semibold text-xs mb-1 flex items-center"><FaFileAlt className="me-1" /> Cover Type</label>
              <select id="coverType" className="form-control bg-[#2a1a1a] text-white border-[#5a2e2e] rounded p-1 text-sm h-8" value={coverType} onChange={e => updateCoverType(e.target.value)}>
                <option value="" disabled>Select Cover Type</option>
                <option value="assignment">Assignment</option>
                <option value="lab">Lab Report</option>
              </select>
            </div>
            <div>
              <label className="form-label font-semibold text-xs mb-1 flex items-center"><FaFileAlt className="me-1" /> {coverType === 'lab' ? 'Lab Report No' : 'Assignment No'}</label>
              <input id="assignment_no" className="form-control bg-[#2a1a1a] text-white border-[#5a2e2e] rounded p-1 text-sm h-8" value={formData.assignment_no} onChange={handleInputChange} disabled={!coverType} required />
            </div>
            <div>
              <label className="form-label font-semibold text-xs mb-1 flex items-center"><FaGraduationCap className="me-1" /> Course Title</label>
              <select id="course_title" className="form-control bg-[#2a1a1a] text-white border-[#5a2e2e] rounded p-1 text-sm h-8" value={formData.course_title} onChange={handleInputChange} disabled={!coverType}>
                <option value="" disabled>Select Course Title</option>
              </select>
            </div>
            <div>
              <label className="form-label font-semibold text-xs mb-1 flex items-center"><FaFileAlt className="me-1" /> {coverType === 'lab' ? 'Lab Report Name' : 'Assignment Name'}</label>
              <input id="assignment_name" className="form-control bg-[#2a1a1a] text-white border-[#5a2e2e] rounded p-1 text-sm h-8" value={formData.assignment_name} onChange={handleInputChange} disabled={!coverType} required />
            </div>
            <div>
              <label className="form-label font-semibold text-xs mb-1 flex items-center"><FaCalendarAlt className="me-1" /> Submission Date</label>
              <input id="submission_date" type="date" className="form-control bg-[#2a1a1a] text-white border-[#5a2e2e] rounded p-1 text-sm h-8" value={formData.submission_date} onChange={handleInputChange} disabled={!coverType} required />
            </div>
            <div>
              <label className="form-label font-semibold text-xs mb-1 flex items-center"><FaUser className="me-1" /> Student Name</label>
              <input id="student_name" className="form-control bg-[#2a1a1a] text-white border-[#5a2e2e] rounded p-1 text-sm h-8" value={formData.student_name} onChange={handleInputChange} disabled={!coverType} required />
            </div>
            <div>
              <label className="form-label font-semibold text-xs mb-1 flex items-center"><FaIdCard className="me-1" /> Student ID</label>
              <input id="student_id" className="form-control bg-[#2a1a1a] text-white border-[#5a2e2e] rounded p-1 text-sm h-8" value={formData.student_id} onChange={handleInputChange} disabled={!coverType} required />
            </div>
            <div className="output-type-group col-span-2 flex flex-col items-center mt-3">
              <label className="form-label font-semibold text-xs mb-1 flex items-center"><FaCheckCircle className="me-1" /> Output Type</label>
              <div className="output-type-btn-group flex gap-3 w-full max-w-[500px] justify-center">
                <button className={`output-type-btn flex-1 text-center p-2 rounded border border-[#5a2e2e] text-[#f8d7da] text-sm font-semibold ${outputType === 'cover' ? 'bg-gradient-to-r from-[#dc2626] to-[#f87171]' : 'bg-[#2a1a1a]'}`} onClick={() => selectOutputType('cover')}>
                  <FaFileAlt className="mr-1 inline" /> Only Cover Page
                </button>
                <button className={`output-type-btn flex-1 text-center p-2 rounded border border-[#5a2e2e] text-[#f8d7da] text-sm font-semibold ${outputType === 'merged' ? 'bg-gradient-to-r from-[#dc2626] to-[#f87171]' : 'bg-[#2a1a1a]'}`} onClick={() => selectOutputType('merged')}>
                  <FaFileAlt className="mr-1 inline" /> Complete Assignment
                </button>
              </div>
            </div>
            {outputType === 'merged' && (
              <div className="upload-container col-span-2 mt-3 p-3 bg-[#2a1a1a] border-2 border-dashed border-[#5a2e2e] rounded text-center">
                <label htmlFor="assignment_file" className="cursor-pointer text-sm font-semibold flex items-center justify-center"><FaUpload className="me-1" /> Upload Assignment (PDF, Optional)</label>
                <input id="assignment_file" type="file" accept=".pdf" className="hidden" onChange={e => setFile(e.target.files[0])} />
                <div className="upload-text mt-2 text-xs">{file ? file.name : 'Drag and drop or click to upload a PDF'}</div>
              </div>
            )}
            <div className="submit-container col-span-2 flex justify-center gap-2 mt-5">
              <button className="btn btn-primary bg-gradient-to-r from-[#dc2626] to-[#f87171] hover:from-[#b91c1c] hover:to-[#dc2626] rounded p-2 font-semibold text-sm" onClick={handleSubmit} disabled={isLoading}>
                <FaDownload className="me-1" /> Download PDF
                {isLoading && <span className="spinner-border spinner-border-sm ms-2" />}
              </button>
              <button className="btn btn-outline-secondary border-[#5a2e2e] text-[#f8d7da] hover:bg-[#3a2a2a] hover:border-[#dc2626] rounded p-2 font-semibold text-sm" onClick={resetForm}>
                <FaUndo className="me-1" /> Reset Form
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-4 text-sm text-[#f8d7da] text-center">© All credit goes to Rahexa</footer>
    </div>
  );
}

export default App;