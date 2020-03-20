import React from 'react';

export function GameTitle({ gameId }) {
  return (
    <div className="hero">
      <div className="hero-body">
        <h1 className="title">Game {gameId}</h1>
      </div>
    </div>
  );
}
