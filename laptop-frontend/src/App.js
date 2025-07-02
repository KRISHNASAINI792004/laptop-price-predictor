import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [ram, setRam] = useState('');
  const [storage, setStorage] = useState('');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrice(null);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/predict/', {
        ram: parseInt(ram),
        storage: parseInt(storage),
      });
      setPrice(res.data.predicted_price);
    } catch (err) {
      console.error(err);
      setPrice('Error');
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>💻KRISHNA'S Laptop Price Predictor System</h1>
        <p style={styles.subtext}>Enter RAM & Storage to get an estimated price</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>RAM (GB)</label>
            <input
              type="number"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              placeholder="e.g., 8"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Storage (GB)</label>
            <input
              type="number"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              placeholder="e.g., 512"
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            {loading ? 'Predicting...' : 'Predict Price'}
          </button>
        </form>
        {price !== null && (
          <div style={styles.resultBox}>
            {price === 'Error' ? (
              <p style={{ color: 'red' }}>Something went wrong. Try again.</p>
            ) : (
              <h2 style={styles.price}>💰 ₹{price}</h2>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: '100vh',
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '20px',
    maxWidth: '420px',
    width: '100%',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    textAlign: 'center',
    transition: 'transform 0.2s ease-in-out',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
    color: '#333',
  },
  subtext: {
    fontSize: '0.95rem',
    color: '#777',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  inputGroup: {
    textAlign: 'left',
  },
  label: {
    fontSize: '0.85rem',
    color: '#555',
    marginBottom: '0.3rem',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border 0.3s',
  },
  button: {
    backgroundColor: '#667eea',
    color: '#fff',
    padding: '0.9rem',
    fontSize: '1rem',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  },
  resultBox: {
    marginTop: '1.8rem',
    padding: '1rem',
    borderRadius: '10px',
    backgroundColor: '#f1f5ff',
    border: '1px solid #c3d2f7',
  },
  price: {
    fontSize: '1.5rem',
    color: '#222',
  },
};

export default App;
