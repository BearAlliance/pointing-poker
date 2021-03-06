import React, { useState } from 'react';
import classNames from 'classnames';
import logo from './logo.svg';
import { Link } from 'react-router-dom';

export function Nav() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  return (
    <nav className="navbar is-fixed is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" onClick={() => setShowBurgerMenu(false)}>
          <img src={logo} width="112" height="28" alt="brand-logo" />
        </Link>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          role="button"
          className={classNames('navbar-burger', 'burger', {
            'is-active': showBurgerMenu
          })}
          aria-label="menu"
          aria-expanded={showBurgerMenu}
          onClick={() => setShowBurgerMenu(!showBurgerMenu)}>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div className={classNames('navbar-menu', { 'is-active': showBurgerMenu })}>
        <div className="navbar-start">
          <Link className="navbar-item" to="/game">
            Poker
          </Link>
          <Link className="navbar-item" to="/retro">
            Retro
          </Link>
        </div>

        <div className="navbar-end" />
      </div>
    </nav>
  );
}
