import React from 'react';
import { NewRetroButton } from './new-retro';

export function RetroNotFound() {
  return (
    <div className="hero" data-testid="game-not-found">
      <div className="hero-body">
        <h1 className="title">Game not found</h1>
        <h2 className="subtitle">
          How about you <NewRetroButton />
        </h2>
      </div>
    </div>
  );
}
