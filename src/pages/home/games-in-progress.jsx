import { useEffect, useState } from 'react';

export function GamesInProgress({ children }) {
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

  if (typeof children === 'function') {
    return children(inProgressCount);
  }

  return inProgressCount;
}
