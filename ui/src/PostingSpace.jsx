import React from 'react';

import PostCard from './components/PostCard.jsx';

export default class PostingSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postings: [
        {
          id: 1, imgUrl: './imgs/posting_imgs/party_time.png', time: '2022/03/14', poster: { name: 'Momo' }, title: 'Birthday Party Welcome!', content: 'Next Friday will be my 5th Birthday! I decide to hold a small part at Dogwood Park. Do you want to join the party?',
        },
        {
          id: 2, imgUrl: './imgs/posting_imgs/friends.png', time: '2022/02/22', poster: { name: 'Lucky' }, title: 'Make New Friends', content: 'I just make this posting to make some new friends. Would you like add me to your contact list?',
        },
      ],
    };
  }

  render() {
    const { postings } = this.state;
    return (
      <>
        <div className="posting-bar">
          <img src="./imgs/party.png" height="128" width="128" alt="party-img" />
          <img src="./imgs/garland.png" height="128" width="128" alt="garland-img" />
          <img src="./imgs/party-copy.png" height="128" width="128" alt="party-img" />
        </div>
        <div className="posting-container">
          {postings.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </>
    );
  }
}
