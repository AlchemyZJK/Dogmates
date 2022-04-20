import React from 'react';

export default function PostCard(props) {
  const { posting, buttonText } = props;
  const imgUrl = `./imgs/posting_imgs/${posting.kind.toLowerCase().split(' ').join('-')}.png`;
  return (
    <div className="postcard-container">
      <img src={imgUrl} width="128" height="128" alt="card-img" />
      <div className="card-title">{posting.title}</div>
      <div className="card-content">{posting.content}</div>
      <div className="card-info-container">
        <div className="poster-name">{`Posted By: ${posting.poster_id}`}</div>
        <div className="time">{posting.created_at.slice(0, 10)}</div>
      </div>
      <button type="button" className="contact">{buttonText}</button>
    </div>
  );
}
