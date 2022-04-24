import React from 'react';

import PostCard from './components/PostCard.jsx';

export default class PostingSpace extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  handleClickButton(posterId) {
    const { user, addToContactList } = this.props;
    if (user === undefined) {
      alert('You are supposed to Login First.');
    } else if (user.pet_id === posterId) {
      alert('This is your own posting :)');
    }
    addToContactList(posterId);
  }

  render() {
    const { user, postings, addToContactList } = this.props;
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
              handleClick={this.handleClickButton}
            />
          ))}
        </div>
      </>
    );
  }
}
