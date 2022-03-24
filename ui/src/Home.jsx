import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Dogmates: Where you could Find FRIENDS for your Dogs!</h1>
      <img className="home-img" src="./imgs/bone.png" alt="dog-with-bone" height="128" width="128" />
      <div className="separator" />

      <div className="card-container">
        <img src="./imgs/map.png" alt="map" height="160" width="160" />
        <div className="text-container">
          <div className="text">
            {'Want to find a friend for your dog to walk with in your neighborhood? Want to have fun with other '
            + 'dogs in the nearby dog park? You could search for a friend for your dog in this neighborhood map! '
            + 'Start from here~'}
          </div>
          <Link className="home-button" to="/neighborhood">Go to Neighborhood</Link>
        </div>
      </div>

      <div className="card-container">
        <img src="./imgs/posting.png" alt="posting" height="160" width="160" />
        <div className="text-container">
          <div className="text">
            {'Want to hold a party for your dog\'s birthday? Want to invite other dogs to join your lovely '
            + 'dog\'s party? Want to attend other dogs\' party to make friends? Here are a list of postings '
            + 'for dog\'s parties or activities!'}
          </div>
          <Link className="home-button" to="/posting-space">Go to Posting Space</Link>
        </div>
      </div>
    </div>
  );
}
