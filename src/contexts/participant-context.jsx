import React, { useState } from 'react';

export const ParticipantContext = React.createContext({ participants: [], setParticipants: () => {} });

export function ParticipantProvider({ children }) {
  const [participants, setParticipants] = useState([]);

  return (
    <ParticipantContext.Provider value={{ participants, setParticipants }}>{children}</ParticipantContext.Provider>
  );
}
