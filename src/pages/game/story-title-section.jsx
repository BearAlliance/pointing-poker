import React from 'react';

export function StoryTitleSection({ value, onChange }) {
  return (
    <div className="field">
      <div className="control">
        <input className="input" type="text" placeholder="Story Title" value={value} onChange={onChange} />
      </div>
    </div>
  );
}
