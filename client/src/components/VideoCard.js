import React from 'react';
import { Button } from '@rmwc/button';
import truncate from 'truncate';
import './VideoCard.scss';

export default function VideoCard({ title, description, thumbnail, duration }) {
  return (
    <div className="video-card">
      <img
        className="video-card__image"
        src={thumbnail}
        alt={title}
        tabIndex="0"
        role="button"
      />
      <div className="video-card__content">
        <div className="video-card__title">{truncate(title, 40)}</div>
        <div className="video-card__description">{truncate(description, 140)}</div>
        <div className="video-card__footer">
          <Button className="video-card__button" label="EMBED NOW" unelevated />
          <Button className="video-card__button" label="SELECT CLIP" unelevated />
          <span className="video-card__duration">{duration} mins</span>
        </div>
      </div>
    </div>
  );
}
