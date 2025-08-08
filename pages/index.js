import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    assignment_no: '',
    course_code: '',
    course_title: '',
    assignment_name: '',
    submission_date: '',
    student_name: '',
    student_id: ''
  })

  const [downloadUrl, setDownloadUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setDownloadUrl(null)

    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => form.append(key, value))

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: form
      })

      if (!res.ok) {
        throw new Error('Failed to generate PDF')
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>PDF Cover Page Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>Assignment No:<br/>
          <input name="assignment_no" value={formData.assignment_no} onChange={handleChange} required />
        </label><br/><br/>
        <label>Course Code:<br/>
          <input name="course_code" value={formData.course_code} onChange={handleChange} required />
        </label><br/><br/>
        <label>Course Title:<br/>
          <input name="course_title" value={formData.course_title} onChange={handleChange} required />
        </label><br/><br/>
        <label>Assignment Name:<br/>
          <input name="assignment_name" value={formData.assignment_name} onChange={handleChange} required />
        </label><br/><br/>
        <label>Date of Submission:<br/>
          <input name="submission_date" value={formData.submission_date} onChange={handleChange} required type="date"/>
        </label><br/><br/>
        <label>Student Name:<br/>
          <input name="student_name" value={formData.student_name} onChange={handleChange} required />
        </label><br/><br/>
        <label>Student ID:<br/>
          <input name="student_id" value={formData.student_id} onChange={handleChange} required />
        </label><br/><br/>
        <button type="submit" disabled={loading}>Generate PDF</button>
      </form>
      {loading && <p>Generating PDF...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      {downloadUrl && (
        <p>
          <a href={downloadUrl} download="cover_page.pdf">Download PDF</a>
        </p>
      )}
    </div>
  )
}