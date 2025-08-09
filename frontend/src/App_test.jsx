import React from 'react';
// Removing CSS import to test if that's causing issues
// import './App.css';

function App() {
  return (
    <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
      <h1 style={{color: 'blue'}}>Assignment Cover Generator</h1>
      <p>React is working! This is a test component.</p>
      <div style={{background: '#f0f0f0', padding: '10px', margin: '10px 0'}}>
        <h2>Test Section</h2>
        <button style={{padding: '10px', background: 'blue', color: 'white', border: 'none', borderRadius: '5px'}}>
          Test Button
        </button>
      </div>
      <div style={{background: '#e8f5e8', padding: '10px', margin: '10px 0'}}>
        <h3>CSS Test</h3>
        <p>If you can see this green background, basic CSS is working.</p>
      </div>
    </div>
  );
}

export default App;
