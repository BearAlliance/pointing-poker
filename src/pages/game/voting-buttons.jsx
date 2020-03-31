import React from 'react';
import { choices } from './voting-choices';

export function VotingButtons({ onSelected, votingType }) {
  return (
    <div className="buttons">
      {choices[votingType].map(choice => (
        <button key={choice.value} className="button is-primary is-light" onClick={() => onSelected(choice.value)}>
          {choice.label || `${choice.value} Points`}
        </button>
      ))}
    </div>
  );
}
