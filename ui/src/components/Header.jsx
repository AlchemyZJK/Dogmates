import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isNeighborhoodSelected = location.pathname === '/neighborhood';
  const isPostingSpaceSelected = location.pathname === '/posting-space';

  return (
    <header className="header">
      <span className="logo">
        <Link to="/">Dogmates</Link>
      </span>
      <ul className="main-nav">
        <li className={isNeighborhoodSelected ? 'selected' : ''}>
          <Link to="/neighborhood">Neighborhood</Link>
        </li>
        <li className={isPostingSpaceSelected ? 'selected' : ''}>
          <Link to="/posting-space">Posting Space</Link>
        </li>
      </ul>
      <Link to="/dogal-space">
        <img src="./imgs/paws.png" alt="paw-icon" width="32" height="32" />
      </Link>
      <span className="user-sign-in-up">SignIn/SignUp</span>
    </header>
  );
}
