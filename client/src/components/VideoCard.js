import React, { useRef } from 'react';
import { Button } from '@rmwc/button';
import { Tooltip } from '@rmwc/tooltip';
import truncate from 'truncate';
import './VideoCard.scss';

export default function VideoCard(props) {
  const { description, duration, id, thumbnail, title } = props;
  const url = `https://www.youtube.com/embed/${id}`;
  const formEl = useRef(null);

  const handleEmbedButtonClick = () => {
    formEl.current.submit();
  };
  
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
          <Button className="video-card__button" label="EMBED NOW" unelevated onClick={handleEmbedButtonClick}/>
          <Tooltip content="Coming soon" showArrow>
            <Button className="video-card__button video-card__button--disabled" label="SELECT CLIP" unelevated />
          </Tooltip>
          <span className="video-card__duration">{duration} mins</span>
        </div>
        <form
          action="https://mit.test.instructure.com/courses/5329/external_content/success/external_tool_dialog"
          id="lti-content-item-return-form"
          method="POST"
          encType="application/x-www-form-urlencoded"
          ref={formEl}
        >
          <input type="hidden" name="return_type" value="iframe" />
          <input type="hidden" name="url" value={url} />
          <input type="hidden" name="title" value={title} />
          <input type="hidden" name="width" value="560" />
          <input type="hidden" name="height" value="315" />
        </form>
      </div>
    </div>
  );
}
