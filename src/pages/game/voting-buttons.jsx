import React from 'react';

export function VotingButtons({ onSelected }) {
  const choices = [
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
      value: 20
    },
    {
      value: 40
    },
    {
      value: 100
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
