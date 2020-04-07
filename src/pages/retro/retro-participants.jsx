import React, { useContext } from 'react';
import { ParticipantContext } from '../../contexts/participant-context';
import { Gravatar } from '../../components/gravatar';

export function RetroParticipants() {
  const { participants } = useContext(ParticipantContext);

  console.log('participate', participants);
  return (
    <div className="columns is-mobile">
      {participants.map(participant => (
        <div className="column is-1 is-one-quarter-mobile is-centered" key={participant.emailHash}>
          <Gravatar size="sm" hash={participant.emailHash} /> {participant.name}
        </div>
      ))}
    </div>
  );
}
