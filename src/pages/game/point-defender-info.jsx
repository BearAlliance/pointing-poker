import React, { useState } from 'react';
import random from 'lodash.random';

export function PointDefenderInfo({ info }) {
  const [deciderName] = useState(getRandomName());

  const highPerson = randomize(info.highPeople);
  const lowPerson = randomize(info.lowPeople);

  function randomize(arr) {
    return arr[random(0, arr.length - 1)];
  }

  function getRandomName() {
    return randomize([
      'The machine learning algorithm',
      'The cloud',
      'The Great Oz',
      'The creator of this app',
      'Your scrum master',
      'Your scrum lord'
    ]);
  }

  if (info.min === info.max || info.lowPeople.length === 0 || info.highPeople.length === 0) {
    return '';
  }

  return (
    <div>
      <div className="has-text-weight-bold is-size-4">Defend your points!</div>
      <div>
        <div>
          <span className="is-italic">{deciderName}</span> has chosen
        </div>
        <div>
          <span className="has-text-weight-bold">{highPerson.name}</span> to defend their{' '}
          <span className="has-text-weight-bold">{info.max}</span> against
        </div>
        <div>
          <span className="has-text-weight-bold">{lowPerson.name}</span> and their{' '}
          <span className="has-text-weight-bold">{info.min}</span>
        </div>
      </div>
    </div>
  );
}
