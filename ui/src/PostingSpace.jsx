import React from 'react';

import PostCard from './components/PostCard.jsx';

export default class PostingSpace extends React.Component {
  render() {
    const { postings } = this.props;
    return (
      <>
        <div className="posting-bar">
          <img src="./imgs/party.png" height="128" width="128" alt="party-img" />
          <img src="./imgs/garland.png" height="128" width="128" alt="garland-img" />
          <img src="./imgs/party-copy.png" height="128" width="128" alt="party-img" />
        </div>
        <div className="posting-container">
          {postings.map((posting) => (
            <PostCard
              key={posting.posting_id}
              posting={posting}
              buttonText="Contact Me"
            />
          ))}
        </div>
      </>
    );
  }
}
