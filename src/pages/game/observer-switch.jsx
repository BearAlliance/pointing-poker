import React, { useState } from 'react';

export function ObserverSwitch({ socket, onChange }) {
  const [isObserver, setIsObserver] = useState(false);

  function changeObserverRole() {
    const newIsObserver = !isObserver;

    if (newIsObserver) {
      socket.becomeObserver();
    } else {
      socket.becomePlayer();
    }
    setIsObserver(newIsObserver);
    onChange(newIsObserver);
  }

  return (
    <button className="button" onClick={changeObserverRole}>
      {isObserver ? 'Become Player' : 'Become Observer'}
    </button>
  );
}
