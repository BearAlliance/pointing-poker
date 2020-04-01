import React from 'react';
import './loading.scss';

export function Loading({ loading = true }) {
  if (loading) {
    return (
      <div className="loading-container" data-testid="loading">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return null;
}
