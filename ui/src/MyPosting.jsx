import React from 'react';
import SideBar from './components/SideBar.jsx';
import PostCard from './components/PostCard.jsx';

export default class MyPosting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postings: [],
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
