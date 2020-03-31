import React from 'react';

export function VotingButtons({ onSelected }) {
  const choices = [
    {
      value: '?',
      label: '?'
    },
    {
      value: 1
    },
    {
      value: 2
    },
    {
      value: 3
    },
    {
      value: 5
    },
    {
      value: 8
    },
    {
      value: 13
    },
    {
      value: 21
    },
    {
      value: 34
    },
    {
      value: 55
    },
    {
      label: '∞',
      value: '∞'
    }
  ];

  return (
    <div className="buttons">
      {choices.map(choice => (
        <button key={choice.value} className="button is-primary is-light" onClick={() => onSelected(choice.value)}>
          {choice.label || `${choice.value} Points`}
        </button>
      ))}
    </div>
  );
}
