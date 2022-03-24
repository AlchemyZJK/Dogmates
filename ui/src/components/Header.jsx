import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <span className="logo">
          <Link to="/">Dogmates</Link>
        </span>
        <ul className="main-nav">
          <li>
            <Link to="/neighborhood">Neighborhood</Link>
          </li>
          <li>
            <Link to="/posting-space">Posting Space</Link>
          </li>
        </ul>
        <img src="./imgs/paws.png" alt="paw-icon" width="32" height="32" />
        <span className="user-sign-in-up">SignIn/SignUp</span>
      </header>
    );
  }
}
