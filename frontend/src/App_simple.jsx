import { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Assignment Cover Generator is Loading...');

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #f3e8ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        margin: '1rem'
      }}>
        <h1 style={{
          fontSize: '2rem',
          color: '#4f46e5',
          marginBottom: '1rem'
        }}>
          🎓 Assignment Cover Generator
        </h1>
        <p style={{
          color: '#6b7280',
          marginBottom: '1.5rem'
        }}>
          {message}
        </p>
        <button
          onClick={() => setMessage('✅ React is working perfectly!')}
          style={{
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Test React
        </button>
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#9ca3af' }}>
          <p>If you see this, the frontend is working correctly!</p>
          <p>Backend: <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" style={{color: '#4f46e5'}}>localhost:3001</a></p>
          <p>Frontend: <a href="http://localhost:5175" target="_blank" rel="noopener noreferrer" style={{color: '#4f46e5'}}>localhost:5175</a></p>
        </div>
      </div>
    </div>
  );
}

export default App;
