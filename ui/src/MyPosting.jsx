import React from 'react';
import SideBar from './components/SideBar.jsx';
import PostCard from './components/PostCard.jsx';

export default class MyPosting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postings: [
        {
          id: 1, imgUrl: './imgs/posting_imgs/party_time.png', time: '2022/03/14', poster: { name: 'Momo' }, title: 'Birthday Party Welcome!', content: 'Next Friday will be my 5th Birthday! I decide to hold a small part at Dogwood Park. Do you want to join the party?',
        },
        {
          id: 3, imgUrl: './imgs/posting_imgs/dog-walking.png', time: '2022/03/27', poster: { name: 'Momo' }, title: 'Let us Play!', content: 'Let us make an appointment and play at the Dogwood Park? Would you like join me?',
        },
      ],
    };
  }

  render() {
    const { postings } = this.state;
    return (
      <div className="dogal-space-container">
        <SideBar />
        <div className="my-posting-container">
          {postings.map((post) => <PostCard key={post.id} post={post} buttonText="Delete" />)}
        </div>
      </div>
    );
  }
}
