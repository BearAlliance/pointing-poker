import React from 'react';
import { NewGameButton } from '../../nav/new-game-button';

export function GameNotFound() {
  return (
    <div className="hero" data-testid="game-not-found">
      <div className="hero-body">
        <h1 className="title">Game not found</h1>
        <h2 className="subtitle">
          How about you <NewGameButton />
        </h2>
      </div>
    </div>
  );
}
