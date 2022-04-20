import React from 'react';
import SideBar from './components/SideBar.jsx';

export default class DogalSpace extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="dogal-space-container">
        <SideBar />
        <DogalInfo user={user} />
      </div>
    );
  }
}

class DogalInfo extends React.Component {
  render() {
    const { user } = this.props;
    const imgUrl = `./imgs/dog_imgs/${user.pet_breed.toLowerCase().split(' ').join('-')}.png`;
    return (
      <div className="dogal-info-container">
        <div className="dogal-img">
          <img src={imgUrl} width="64" height="64" alt="dogal-profile-img" />
        </div>
        <div className="dogal-id">
          <span className="hint">ID: </span>
          <span className="text-content">{user.pet_id}</span>
        </div>
        <div className="dogal-name">
          <span className="hint">Name: </span>
          <span className="text-content">{user.pet_name}</span>
        </div>
        <div className="dogal-breed">
          <span className="hint">Breed: </span>
          <span className="text-content">{user.pet_breed}</span>
        </div>
        <div className="dogal-email">
          <span className="hint">Email: </span>
          <span className="text-content">{user.pet_mail}</span>
        </div>
        {/* <div className="dogal-password"> */}
        {/*  <span className="hint">Password: </span> */}
        {/*  <span className="text-content">********</span> */}
        {/* </div> */}
      </div>
    );
  }
}
