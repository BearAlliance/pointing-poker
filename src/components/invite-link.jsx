import React from 'react';
import { isDevelopment } from '../env';

function gameLink(gameId, type) {
  return isDevelopment()
    ? `http://${window.location.host}/${type}/${gameId}`
    : `https://${window.location.host}/${type}/${gameId}`;
}

export function InviteLink({ id, type, showHref = false }) {
  const href = gameLink(id, type);

  return <a href={href}>{showHref ? href : `#${id}`} </a>;
}
