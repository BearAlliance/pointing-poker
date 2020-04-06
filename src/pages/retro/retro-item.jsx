import React, { useState } from 'react';
import classNames from 'classnames';

export function RetroItem({ item, onRemove, onLike, onUnlike, hasVoted }) {
  const [isTrashHover, setIsTrashHover] = useState(null);
  const [isVoteHover, setIsVoteHover] = useState(null);

  return (
    <div className="box">
      <div className="media">
        <div className="media-content">
          <p>
            <strong>{item.playerId}</strong>
          </p>
          <p>{item.text}</p>
        </div>
      </div>
      <div className="has-text-grey columns has-text-right">
        <div className="column is-two-thirds" />
        <div className="column">
          <span className="icon">
            <i
              title={hasVoted ? 'Unlike this item' : 'Like this item'}
              style={{ cursor: 'pointer' }}
              className={classNames('fa-thumbs-up', {
                'has-text-grey-dark': isVoteHover,
                fas: hasVoted,
                far: !hasVoted
              })}
              onMouseEnter={() => setIsVoteHover(true)}
              onMouseLeave={() => setIsVoteHover(false)}
              onClick={() => (hasVoted ? onUnlike() : onLike())}
            />
          </span>
          {item.votes.length}
        </div>
        <div className="column">
          <span className="icon">
            <i
              title="Remove item"
              style={{ cursor: 'pointer' }}
              className={classNames('far', 'fa-trash-alt', { 'has-text-grey-dark': isTrashHover })}
              onMouseEnter={() => setIsTrashHover(true)}
              onMouseLeave={() => setIsTrashHover(false)}
              onClick={onRemove}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
