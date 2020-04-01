import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import GamePage from './game-page';

describe('Game Page', () => {
  const match = {
    params: {
      gameId: 1234
    }
  };

  test('shows game not found', async () => {
    global.fetch = jest.fn(() => Promise.resolve());

    await doRender();

    expect(screen.queryByTestId('game-not-found')).toBeInTheDocument();
  });

  test('shows add player component for a found game', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        ok: true
      })
    );

    await doRender();

    expect(screen.queryByTestId('add-player')).toBeInTheDocument();

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });

  async function doRender() {
    await act(async () => {
      render(
        <MemoryRouter>
          <GamePage match={match} />
        </MemoryRouter>
      );
    });
  }
});
