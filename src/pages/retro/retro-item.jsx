import React, { useState } from 'react';
import classNames from 'classnames';

export function RetroItem({ item, onRemove, onLike, onUnlike, hasVoted }) {
  const [isTrashHover, setIsTrashHover] = useState(null);
  const [isVoteHover, setIsVoteHover] = useState(null);

  return (
    <div key={item.id} className="notification is-info-light">
      <div>{item.text}</div>
      <div className="has-text-right has-text-grey">
        {item.votes.length}
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
  );
}
