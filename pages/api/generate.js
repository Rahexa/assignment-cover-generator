import formidable from 'formidable'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export const config = {
  api: {
    bodyParser: false,
  },
}

function parseForm(req) {
  const form = new formidable.IncomingForm()
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields) => {
      if (err) reject(err)
      else resolve(fields)
    })
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const fields = await parseForm(req)

    // Create a new PDF
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595, 842]) // A4 size in points
    const { width, height } = page.getSize()

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const fontSizeTitle = 24
    const fontSizeNormal = 14

    page.drawText('Assignment Cover Page', {
      x: 50,
      y: height - 80,
      size: fontSizeTitle,
      font,
      color: rgb(0, 0, 0),
    })

    // Draw fields
    let y = height - 120
    const lineHeight = 25

    const drawField = (label, value) => {
      page.drawText(label, { x: 50, y, size: fontSizeNormal, font, color: rgb(0, 0, 0) })
      page.drawText(value, { x: 220, y, size: fontSizeNormal, font, color: rgb(0, 0, 0) })
      y -= lineHeight
    }

    drawField('Assignment No:', fields.assignment_no || '')
    drawField('Course Code:', fields.course_code || '')
    drawField('Course Title:', fields.course_title || '')
    drawField('Assignment Name:', fields.assignment_name || '')
    drawField('Date of Submission:', fields.submission_date || '')
    drawField('Student Name:', fields.student_name || '')
    drawField('Student ID:', fields.student_id || '')

    const pdfBytes = await pdfDoc.save()

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=cover_page.pdf')
    res.status(200).send(Buffer.from(pdfBytes))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}