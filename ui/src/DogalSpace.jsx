import React from 'react';
import SideBar from './components/SideBar.jsx';

export default class DogalSpace extends React.Component {
  render() {
    return (
      <div className="dogal-space-container">
        <SideBar />
        <div>Dogal Info Placeholder</div>
      </div>
    );
  }
}
