import React, { Fragment, useEffect, useState } from 'react';
import { Loading } from '../../loading/loading';
import { RetroNotFound } from './retro-not-found';
import { AddPlayer } from '../../components/add-player';
import { RetroTitle } from './retro-title';
import { ActiveRetro } from './active-retro';

export default function RetroPage({ match }) {
  const [currentRetroId, setCurrentRetroId] = useState(null);
  const [hasError, setHasError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playerName, setPlayerName] = useState(null);

  useEffect(() => {
    const { retroId } = match.params;
    console.log(retroId);
    getRetroData(retroId);
    setCurrentRetroId(retroId);
  }, [match]);

  function getRetroData(currentRetroId) {
    setLoading(true);
    fetch(`/api/retro/${currentRetroId}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then(() => {
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return <Loading />;
  }

  if (hasError) {
    return <RetroNotFound />;
  }

  if (currentRetroId) {
    return (
      <div>
        {!playerName && (
          <Fragment>
            <RetroTitle retroId={currentRetroId} />
            <div className="column">
              <div className="hero">
                <div className="hero-body">
                  <AddPlayer
                    type="retro"
                    id={currentRetroId}
                    onSubmit={playerName => {
                      setPlayerName(playerName);
                    }}
                  />
                </div>
              </div>
            </div>
          </Fragment>
        )}
        {playerName && <ActiveRetro retroId={currentRetroId} playerName={playerName} />}
      </div>
    );
  }
}
