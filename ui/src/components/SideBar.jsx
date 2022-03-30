import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SideBar() {
  const location = useLocation();
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">Dogal Space</div>
      <ul>
        <li className={location.pathname === '/dogal-space' ? 'selected' : ''}>
          <Link to="/dogal-space">Profile</Link>
        </li>
        <li className={location.pathname === '/my-posting' ? 'selected' : ''}>
          <Link to="/my-posting">My Posting List</Link>
        </li>
        <li className={location.pathname === '/new-posting' ? 'selected' : ''}>
          <Link to="/new-posting">Publish a Posting</Link>
        </li>
        <li className={location.pathname === '/chatting' ? 'selected' : ''}>
          <Link to="/chatting">My Chatting</Link>
        </li>
      </ul>
    </div>
  );
}
