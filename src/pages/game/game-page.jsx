import React, { useEffect, useState } from 'react';
import { Loading } from '../../loading/loading';

export default function GamePage({ match }) {
  const [gameId, setGameId] = useState(null);
  const [loading, setLoading] = useState(true);

  const sessionId = match.params.gameId;

  useEffect(() => {
    fetch(`/api/game/${sessionId}`)
      .then(res => res.json())
      .then(res => {
        setGameId(res.id);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="hero">
      <div className="hero-body">
        <h1 className="title">Game {gameId}</h1>
      </div>
    </div>
  );
}
