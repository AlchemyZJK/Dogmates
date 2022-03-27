import React from 'react';

export default function PostCard(props) {
  const { post } = props;
  return (
    <div className="postcard-container">
      <img src={post.imgUrl} width="128" height="128" alt="card-img" />
      <div className="card-title">{post.title}</div>
      <div className="card-content">{post.content}</div>
      <div className="card-info-container">
        <div className="poster-name">{`Posted By: ${post.poster.name}`}</div>
        <div className="time">{post.time}</div>
      </div>
      <button type="button" className="contact">Contact Me</button>
    </div>
  );
}
