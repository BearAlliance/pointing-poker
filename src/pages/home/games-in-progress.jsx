import React, { useEffect, useState } from 'react';

export function GamesInProgress() {
  const [inProgressCount, setInProgressCount] = useState(null);

  useEffect(() => {
    fetch('/api/games/in-progress/count')
      .then(res => res.json())
      .then(res => {
        setInProgressCount(res.count);
      });
  }, []);

  if (inProgressCount === null) {
    return null;
  }

  return <span>{inProgressCount}</span>;
}
