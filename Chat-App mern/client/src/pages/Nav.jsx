import React from 'react';
import { useAuth } from '../store/Auth';
import { NavLink } from 'react-router-dom';
// import './Nav.css';
import '../App.css'

const Nav = () => {
  const { isLoggedIn, user } = useAuth();

  if (isLoggedIn && !user) {
    return <h1>Loading...</h1>;
  }

  return (
    <header className="header">
      <div className="nav-container">
        <h1 className="app-title">Chat App</h1>
        <nav className="nav-links">
          {isLoggedIn ? (
            <>
              <div className="user-info">
                <h2 className="user-name" style={{color:"yellowgreen",marginLeft:"100px"}}>Welcome: <b style={{color:"skyblue"}}> {user.result.name}</b></h2>
              </div>
              <NavLink to="/chat" className="nav-link">Chat</NavLink>
              <NavLink to="/logout" className="nav-link">Logout</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/register" className="nav-link">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
