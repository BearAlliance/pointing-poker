import React from 'react';
import md5 from 'md5';

export function getHashFromEmail(email = '') {
  return md5(email.trim().toLowerCase());
}

export function getRandomHash() {
  return md5(Math.random());
}

export function Gravatar({ hash, email, size = 'md' }) {
  const sizeClasses = {
    sm: 'is-32x32',
    md: 'is-64x64',
    lg: 'is-128x128'
  };

  const sizes = {
    sm: '32',
    md: '64',
    lg: '128'
  };

  return (
    <figure className={`image ${sizeClasses[size]}`}>
      <img
        className="is-rounded"
        src={`https://www.gravatar.com/avatar/${hash ? hash : getHashFromEmail(email)}?d=identicon&s=${sizes[size]}`}
        alt="profile"
      />
    </figure>
  );
}
