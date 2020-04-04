import React from 'react';
import { NewGameButton } from './new-game-button';

export default function GameSplashPage() {
  return (
    <div>
      <div className="hero">
        <div className="hero-body">
          <h1 className="title">Pointing Poker</h1>
          <h2 className="subtitle">Unit-less measures of complexity, or whatever.</h2>
          <NewGameButton />
        </div>
      </div>
    </div>
  );
}
