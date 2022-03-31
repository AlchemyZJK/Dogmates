import React from 'react';
import SideBar from './components/SideBar.jsx';

export default class DogalSpace extends React.Component {
  render() {
    return (
      <div className="dogal-space-container">
        <SideBar />
        <DogalInfo />
      </div>
    );
  }
}

class DogalInfo extends React.Component {
  render() {
    return (
      <div className="dogal-info-container">
        <div className="dogal-img">
          <img src="./imgs/dog_imgs/husky.png" width="64" height="64" alt="dogal-profile-img" />
        </div>
        <div className="dogal-id">
          <span className="hint">ID: </span>
          <span className="text-content">3453234242</span>
        </div>
        <div className="dogal-name">
          <span className="hint">Name: </span>
          <span className="text-content">Momo</span>
        </div>
        <div className="dogal-breed">
          <span className="hint">Breed: </span>
          <span className="text-content">Husky</span>
        </div>
        <div className="dogal-email">
          <span className="hint">Email: </span>
          <span className="text-content">momo@puppy.com</span>
        </div>
        <div className="dogal-password">
          <span className="hint">Password: </span>
          <span className="text-content">********</span>
        </div>
      </div>
    );
  }
}
