import React from 'react';
import { act, wait, render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AddPlayer } from './add-player';

describe('Add Player', () => {
  test('shows error if no name entered', async () => {
    await doRender();
    await wait(() => {
      fireEvent.click(screen.getByText('Join'));
    });

    expect(screen.getByTestId('join-error').textContent).toBe('Required');
  });

  test('shows error if name is too long', async () => {
    await doRender();
    await wait(() => {
      fireEvent.change(screen.getByTestId('text-input-firstName'), { target: { value: 'More than 15 characters' } });
      fireEvent.click(screen.getByText('Join'));
    });

    expect(screen.getByTestId('join-error').textContent).toBe('Must be 15 characters or less');
  });

  test('show error if name is already taken', async () => {
    await doRender();

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ available: false }),
        ok: true
      })
    );

    await wait(() => {
      fireEvent.change(screen.getByTestId('text-input-firstName'), { target: { value: 'Bobby' } });
      fireEvent.click(screen.getByText('Join'));
    });

    expect(screen.getByTestId('join-error').textContent).toBe('Name already taken, try another');
    global.fetch.mockRestore();
  });

  async function doRender() {
    await act(async () => {
      render(<AddPlayer />);
    });
  }
});
