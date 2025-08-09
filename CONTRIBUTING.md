# Contributing to Assignment BaBa

We love your input! We want to make contributing to Assignment BaBa as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## 🚀 Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## 📋 Pull Request Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## 🐛 Report Bugs Using GitHub Issues

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/Rahexa/assignment-cover-generator/issues); it's that easy!

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## 🎨 Feature Requests

We welcome feature requests! Please:

1. Check if the feature has already been requested
2. Explain the use case clearly
3. Provide examples of how it would be used
4. Consider the scope and complexity

### Popular Feature Ideas
- New template designs
- Additional course databases
- Enhanced customization options
- Mobile app development
- Batch processing capabilities

## 💻 Development Setup

1. Fork and clone the repository
```bash
git clone https://github.com/your-username/assignment-cover-generator.git
cd assignment-cover-generator
```

2. Install dependencies
```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

3. Start development servers
```bash
# Frontend
cd frontend && npm run dev

# Backend (in another terminal)
cd backend && npm start
```

## 📝 Coding Standards

### JavaScript/React
- Use ES6+ features
- Follow React Hooks patterns
- Use functional components
- Implement proper error handling
- Add comments for complex logic

### CSS
- Use consistent naming conventions
- Maintain responsive design
- Follow the existing dark theme
- Use CSS-in-JS for component styling

### Git Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Examples:
```
feat: Add creative template design
fix: Resolve course search dropdown issue
docs: Update installation instructions
style: Improve button hover animations
refactor: Optimize PDF generation logic
```

## 🏗️ Project Structure

```
assignment-cover-generator/
├── frontend/          # React application
│   ├── src/
│   │   ├── App.jsx    # Main component
│   │   └── ...
│   └── public/
├── backend/           # Node.js API
│   ├── index.js       # Express server
│   ├── templates/     # HTML templates
│   └── ...
└── docs/             # Documentation
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

### Manual Testing Checklist
- [ ] Cover page generation works
- [ ] Course search functionality
- [ ] File upload and merging
- [ ] Template selection
- [ ] Form validation
- [ ] Responsive design
- [ ] Cross-browser compatibility

## 📚 Areas for Contribution

### 🎨 Frontend
- UI/UX improvements
- New template designs
- Mobile responsiveness
- Accessibility features
- Performance optimizations

### ⚙️ Backend
- API enhancements
- PDF generation improvements
- File processing optimization
- Security enhancements
- Database integration

### 📖 Documentation
- Code comments
- API documentation
- User guides
- Video tutorials
- Translation support

### 🔧 DevOps
- Build optimizations
- Deployment improvements
- CI/CD pipeline
- Testing automation
- Performance monitoring

## 🤝 Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙋‍♂️ Questions?

Feel free to open an issue with the "question" label, or reach out to the maintainers directly.

---

**Thank you for contributing to Assignment BaBa! 🎓✨**
