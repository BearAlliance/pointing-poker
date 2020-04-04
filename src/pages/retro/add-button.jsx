import React, { useState } from 'react';
import classNames from 'classnames';

export function AddButton({ onClick }) {
  const [hover, setHover] = useState(null);

  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="has-text-grey"
      onClick={onClick}>
      <i
        style={{ cursor: 'pointer' }}
        className={classNames('fas', 'fa-plus-circle', 'fa-2x', { 'has-text-grey-dark': hover })}
      />
    </span>
  );
}
