import React from 'react';

export function StoryTitleSection({ onChange }) {
  return (
    <div className="field">
      <div className="control">
        <input className="input" type="text" placeholder="Story Title" onChange={onChange} />
      </div>
    </div>
  );
}
