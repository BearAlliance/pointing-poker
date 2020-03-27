import React from 'react';
import { isDevelopment } from '../../env';

function gameLink(gameId) {
  return isDevelopment()
    ? `http://${window.location.host}/game/${gameId}`
    : `https://${window.location.host}/game/${gameId}`;
}

export function InviteLink({ gameId, showHref = false }) {
  const href = gameLink(gameId);

  return <a href={href}>{showHref ? href : `#${gameId}`} </a>;
}
