import React from 'react';
import SideBar from './components/SideBar.jsx';
import PostCard from './components/PostCard.jsx';

export default class MyPosting extends React.Component {
  render() {
    const { postings, deletePosting } = this.props;
    return (
      <div className="dogal-space-container">
        <SideBar />
        <div className="my-posting-container">
          {postings.map((posting) => (
            <PostCard
              key={posting.posting_id}
              posting={posting}
              buttonText="Delete"
              handleClick={deletePosting}
            />
          ))}
        </div>
      </div>
    );
  }
}
