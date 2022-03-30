import React from 'react';
import SideBar from './components/SideBar.jsx';

export default class MyPosting extends React.Component {
  render() {
    return (
      <div className="dogal-space-container">
        <SideBar />
        <div>My Posting Placeholder</div>
      </div>
    );
  }
}
