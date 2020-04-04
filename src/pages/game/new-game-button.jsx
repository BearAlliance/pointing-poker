import React, { useState } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

function _NewGameButton({ history }) {
  const [loading, setLoading] = useState(null);
  const [hasError, setHasError] = useState(null);

  function startSession() {
    setLoading(true);
    fetch(`/api/game/create`, { method: 'POST' })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then(res => {
        const gameId = res.id;
        history.push(`/game/${gameId}`);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (hasError) {
    return (
      <button className={classNames('button', 'is-danger', { 'is-loading': loading })} onClick={startSession}>
        Error, try again
      </button>
    );
  }

  return (
    <button className={classNames('button', 'is-primary', { 'is-loading': loading })} onClick={startSession}>
      Start a session
    </button>
  );
}

export const NewGameButton = withRouter(_NewGameButton);
