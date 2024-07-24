import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
// import {toast} from 'react-toastify'

const Login = () => {
  const navigate = useNavigate();
  const { storeTokenInloclStr, isLoggedIn } = useAuth();

  if (isLoggedIn) {
    navigate('/');
  }

  const [user, setUser] = useState({
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInloclStr(res_data.token);
        setUser({
          phone: '',
          password: '',
        });
      alert('Login success');
        navigate('/chat');
      } else {
        alert(res_data.message);
      }
    } catch (error) {
      console.log('Error while login user', error);
    }
  };

  return (
    <div className="login-container" style={styles.container}>
      <div className="login-card" style={styles.card}>
        <h1 className="login-title" style={styles.title}>Login to WhatsApp</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="phone" style={styles.label}>Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              style={styles.input}
              required
            />
          </div>
          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={styles.input}
              required
            />
            <div style={styles.passwordHelp}>Your password must be at least 8 characters long.</div>
          </div>
          <button type="submit" className="login-button" style={styles.button}>Login</button>
        </form>
        <div className="forgot-password" style={styles.forgotPassword}>
          <a href="/forgot-password" style={styles.link}>Forgot password?</a>
        </div>
        <div className="signup-link" style={styles.signupLink}>
          Don't have an account? <NavLink to={"/register"} style={styles.link}>Signup here</NavLink>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  card: {
    padding: '40px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  passwordHelp: {
    marginTop: '5px',
    fontSize: '12px',
    color: '#888',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#25D366',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  forgotPassword: {
    marginTop: '10px',
  },
  link: {
    color: '#25D366',
    textDecoration: 'none',
  },
  signupLink: {
    marginTop: '20px',
  },
};

export default Login;
