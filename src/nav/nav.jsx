import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import logo from './logo.svg';
import { Link } from 'react-router-dom';

function ExternalNavLink({ label, url }) {
  return (
    <a
      className="navbar-item"
      rel="noopener noreferrer"
      href={url}
      target="_blank">
      {label}
      {'   '}
      <i className="fas fa-external-link-alt fa-xs left-pad" />
    </a>
  );
}

function NavLink({ label, path, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === path;
  return (
    <div className="navbar-item">
      <Link
        onClick={onClick}
        className={classNames('has-text-secondary', {
          'has-text-primary': isActive
        })}
        to={path}>
        {label}
      </Link>
    </div>
  );
}

export function Nav() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  return (
    <nav
      className="navbar is-fixed is-light"
      role="navigation"
      aria-label="main navigation">
      <div className="navbar-brand">
        <Link
          to="/"
          className="navbar-item"
          onClick={() => setShowBurgerMenu(false)}>
          <img src={logo} width="112" height="28" alt="brand-logo" />
        </Link>

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

      <div
        className={classNames('navbar-menu', { 'is-active': showBurgerMenu })}>
        <div className="navbar-start"></div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-success">Start a session</button>
              <button className="button">Join a session</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
