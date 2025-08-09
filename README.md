# 🎓 Assignment BaBa

> **Professional Assignment & Lab Report Cover Page Generator**

A modern, full-stack web application that automatically generates professional cover pages for academic assignments and lab reports with intelligent course management and template customization.

![Assignment BaBa Demo](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![Node.js](https://img.shields.io/badge/Node.js-22+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

### 🎨 **Template System**
- **Professional Template**: Clean, formal layout with real preview image
- **Coming Soon**: Creative, Modern, and Corporate templates
- Live template preview with demo images
- Responsive template selection interface

### 📚 **Smart Course Management**
- **60+ Pre-loaded Courses**: CSE, EEE, ENG, MAT departments
- **Intelligent Search**: Search by course code, title, or keywords
- **Auto-completion**: Real-time course suggestions
- **Course Categories**: Programming, Mathematics, Electronics, etc.

### 📄 **Document Generation**
- **Dual Output Types**: Cover page only or complete assignment (cover + uploaded file)
- **File Support**: PDF, DOC, DOCX uploads
- **Smart Filename**: Auto-generated with student ID and course abbreviations
- **Professional Formatting**: University-standard layouts

### 🎯 **User Experience**
- **Dark Theme UI**: Modern glass morphism design
- **Form Persistence**: Auto-save to localStorage
- **Real-time Validation**: Instant feedback on form completion
- **Responsive Design**: Works on desktop, tablet, and mobile

### 🔧 **Technical Features**
- **RESTful API**: Node.js backend with Express
- **PDF Generation**: Server-side HTML to PDF conversion
- **File Processing**: Secure file upload and merging
- **Template Engine**: Dynamic HTML template rendering

---

## 🚀 Live Demo

**🌐 [Visit Assignment BaBa Live](https://assignment-cover-generator.vercel.app)**

---

## 📱 Screenshots

<div align="center">

### Main Interface
![Main Interface](https://via.placeholder.com/800x450/1a1a1a/dc2626?text=Assignment+BaBa+Main+Interface)

### Template Selection
![Template Selection](https://via.placeholder.com/400x300/1a1a1a/dc2626?text=Template+Preview)

### Course Search
![Course Search](https://via.placeholder.com/400x300/1a1a1a/dc2626?text=Smart+Course+Search)

</div>

---

## 🛠️ Quick Start

### Prerequisites
- Node.js 22+ and npm
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/Rahexa/assignment-cover-generator.git
cd assignment-cover-generator

# Install dependencies
npm install
npm install --prefix frontend
npm install --prefix backend

# Build frontend
npm run build --prefix frontend

# Start development server
npm run dev
```

### Development Mode

```bash
# Frontend (React + Vite)
cd frontend
npm run dev

# Backend (Node.js + Express)
cd backend
npm start
```

---

## 📁 Project Structure

```
assignment-cover-generator/
├── 📁 frontend/                 # React frontend application
│   ├── 📁 src/
│   │   ├── App.jsx              # Main application component
│   │   ├── main.jsx             # React entry point
│   │   └── App.css              # Styling
│   ├── 📁 public/
│   │   ├── temp-1.jpg           # Template preview image
│   │   └── favicon.ico          # App icon
│   ├── package.json             # Frontend dependencies
│   └── vite.config.js           # Vite configuration
├── 📁 backend/                  # Node.js backend API
│   ├── index.js                 # Express server
│   ├── 📁 templates/
│   │   ├── assignment.html      # Assignment template
│   │   └── lab.html             # Lab report template
│   └── package.json             # Backend dependencies
├── vercel.json                  # Deployment configuration
├── package.json                 # Root dependencies
└── README.md                    # Project documentation
```

---

## 🎓 Supported Courses

Our application includes **60+ courses** across multiple departments:

### 💻 Computer Science & Engineering (CSE)
- Programming: Structured Programming, OOP, Data Structures
- Systems: Operating Systems, Computer Networks, Databases
- Advanced: AI, Machine Learning, Computer Graphics

### ⚡ Electrical & Electronic Engineering (EEE)
- Circuits: Electrical Circuits I & II
- Electronics: Digital Electronics, Microprocessors
- Control: Control Systems, Power Electronics

### 📖 General Education
- Mathematics: Engineering Mathematics I-IV
- English: General English, Technical Writing
- Others: Economics, Physics

---

## 🔧 Technical Stack

### Frontend
- **Framework**: React 18+ with Hooks
- **Build Tool**: Vite for fast development
- **Styling**: CSS-in-JS with custom themes
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: localStorage for form persistence

### Backend
- **Runtime**: Node.js 22+
- **Framework**: Express.js
- **PDF Generation**: Puppeteer/HTML-PDF
- **File Processing**: Multer for uploads
- **Template Engine**: Dynamic HTML rendering

### Deployment
- **Platform**: Vercel
- **CI/CD**: Automatic deployment from GitHub
- **Domain**: Custom domain support
- **SSL**: Automatic HTTPS

---

## 📋 Usage Guide

### 1. **Select Cover Type**
Choose between Assignment or Lab Report format

### 2. **Fill Student Information**
- Assignment/Lab name and number
- Student details (name, ID, batch, section)
- Submission date and session

### 3. **Choose Course**
- Search from 60+ pre-loaded courses
- Auto-completion suggestions
- Smart keyword matching

### 4. **Select Template**
- Professional template (active)
- Preview with actual demo image
- More templates coming soon

### 5. **Choose Output Type**
- **Cover Only**: Just the cover page
- **Complete**: Cover + your uploaded file

### 6. **Generate & Download**
- Instant PDF generation
- Smart filename: `StudentID-(COURSE).pdf`
- Professional formatting

---

## 🎨 Template Features

### Professional Template
- **Clean Layout**: University-standard formatting
- **Logo Integration**: Customizable university branding
- **Responsive Design**: Looks great in print and digital
- **Smart Typography**: Optimized font hierarchy
- **Preview Image**: 60x75px template demonstration

### Coming Soon
- **Creative Template**: Colorful and artistic design
- **Modern Template**: Sleek and minimalist
- **Corporate Template**: Business-style formatting

---

## 🔒 File Security

- **Secure Upload**: Files processed server-side only
- **Temporary Storage**: Files deleted after processing
- **No Data Retention**: No permanent file storage
- **Privacy First**: No tracking or analytics

---

## 🌟 Advanced Features

### Smart Filename Generation
```javascript
// Example outputs:
"12345-(SP).pdf"     // Structured Programming
"67890-(DS).pdf"     // Data Structure  
"11111-(AI).pdf"     // Artificial Intelligence
```

### Course Search Intelligence
- Search by course code: "CSE 111"
- Search by title: "Object Oriented"
- Search by keywords: "oop", "programming"
- Fuzzy matching for typos

### Form Persistence
- Auto-save as you type
- Restore on page reload
- Clear data option
- No data loss

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
npm install -g vercel
vercel --prod
```

### Manual Deployment
```bash
# Build for production
npm run build --prefix frontend

# Start production server
npm start
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
- Use GitHub Issues
- Include screenshots
- Describe reproduction steps

### ✨ Feature Requests
- Suggest new templates
- Propose course additions
- UI/UX improvements

### 💻 Code Contributions
```bash
# Fork the repository
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git commit -m "Add your feature description"

# Push and create pull request
git push origin feature/your-feature-name
```

---

## 📈 Roadmap

### Version 2.0
- [ ] Additional template designs
- [ ] Custom template builder
- [ ] Batch processing
- [ ] API integrations

### Version 2.1
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced customization
- [ ] User accounts

---

## 📞 Support

### Get Help
- **GitHub Issues**: [Report bugs or request features](https://github.com/Rahexa/assignment-cover-generator/issues)
- **Documentation**: Check this README and code comments
- **Community**: Join discussions in GitHub Discussions

### FAQ

**Q: Can I add custom courses?**
A: Currently, courses are pre-loaded. Custom course support is planned for v2.0.

**Q: Are my files stored permanently?**
A: No, all uploaded files are processed and deleted immediately.

**Q: Can I customize templates?**
A: Template customization is planned for future releases.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Rahexa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **React Team**: For the amazing React framework
- **Vercel**: For seamless deployment platform
- **Open Source Community**: For inspiration and tools
- **Students**: For feedback and feature suggestions

---

## 📊 Statistics

![GitHub stars](https://img.shields.io/github/stars/Rahexa/assignment-cover-generator?style=social)
![GitHub forks](https://img.shields.io/github/forks/Rahexa/assignment-cover-generator?style=social)
![GitHub issues](https://img.shields.io/github/issues/Rahexa/assignment-cover-generator)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Rahexa/assignment-cover-generator)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

**🔗 [Live Demo](https://assignment-cover-generator.vercel.app) | [Report Bug](https://github.com/Rahexa/assignment-cover-generator/issues) | [Request Feature](https://github.com/Rahexa/assignment-cover-generator/issues)**

**Made with ❤️ by [Rahexa](https://github.com/Rahexa)**

</div>