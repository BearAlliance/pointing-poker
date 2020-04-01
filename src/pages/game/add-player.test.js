import React from 'react';
import { act, wait, render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AddPlayer } from './add-player';

describe.only('Add Player', () => {
  test('shows Error if no name entered when Join button clicked', async () => {
    await doRender();
    await wait(() => {
      fireEvent.click(screen.getByText('Join'));
    });

    expect(screen.queryByText('Required')).toBeInTheDocument();
  });

  async function doRender() {
    await act(async () => {
      render(<AddPlayer />);
    });
  }
});
