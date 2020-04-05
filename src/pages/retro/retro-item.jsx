import React, { useState } from 'react';
import classNames from 'classnames';

export function RetroItem({ item, onRemove }) {
  const [isTrashHover, setIsTrashHover] = useState(null);

  return (
    <div key={item.id} className="notification is-info-light">
      {item.text}
      <div className="is-pulled-right has-text-grey">
        <i
          title="Remove item"
          style={{ cursor: 'pointer' }}
          className={classNames('far', 'fa-trash-alt', { 'has-text-grey-dark': isTrashHover })}
          onMouseEnter={() => setIsTrashHover(true)}
          onMouseLeave={() => setIsTrashHover(false)}
          onClick={onRemove}
        />
      </div>
    </div>
  );
}
