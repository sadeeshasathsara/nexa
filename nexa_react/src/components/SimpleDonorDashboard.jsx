import React from 'react';

const SimpleDonorDashboard = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Donor Dashboard</h1>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#666', marginBottom: '10px' }}>Welcome to your dashboard!</h2>
        <p style={{ color: '#888' }}>This is a simple test to see if the dashboard loads properly.</p>
        <button 
          style={{ 
            backgroundColor: '#ef4444', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Test Button
        </button>
      </div>
    </div>
  );
};

export default SimpleDonorDashboard;
