import React from 'react';
import { NewRetroButton } from './new-retro';

export default function RetroSplashPage() {
  return (
    <div>
      <div className="hero">
        <div className="hero-body">
          <h1 className="title">Retrospective</h1>
          <h2 className="subtitle">Everything is clear in hindsight</h2>
          <NewRetroButton />
        </div>
      </div>
    </div>
  );
}
