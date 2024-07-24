import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SuccessPayment = () => {

const reference = useSearchParams()

  return (
    <div style={styles.container}>
      <div style={styles.iconWrapper}>
        <svg
          style={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m7-2A10 10 0 1 1 3 12a10 10 0 0 1 18 0z"
          />
        </svg>
      </div>
      <div style={styles.messageWrapper}>
        <h1 style={styles.title}>Payment Successful!</h1>
        <p style={styles.message}>
          Thank you for your purchase. Your transaction was completed successfully.
        </p>
        <div style={styles.details}>
          {/* <p>Order ID: #123456789</p> */}
          <p>Transaction ID: {reference}</p>
        </div>
        <a style={styles.button} href="/">Continue Shopping</a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  iconWrapper: {
    marginBottom: '20px',
  },
  icon: {
    color: '#4BB543',
  },
  messageWrapper: {
    background: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    color: '#4BB543',
    marginBottom: '10px',
  },
  message: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
  },
  details: {
    marginBottom: '20px',
    color: '#777',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#4BB543',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default SuccessPayment;
