import React from 'react';
import classNames from 'classnames';
import './footer.scss';

export function Footer() {
  const socialLinks = [
    {
      href: 'https://github.com/BearAlliance/pointing-poker',
      icon: 'fa-github'
    }
  ];

  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <div>
          <div className="is-pulled-left is-size-7">
            <div>
              <strong>Pointing Poker</strong>
            </div>
            <div className=" has-text-secondary">
              ©<a href="http://nickcacace.com">Nick Cacace</a> {new Date().getFullYear()}
            </div>
          </div>
          <div className="is-pulled-right">
            {socialLinks.map(socialLink => (
              <a
                key={socialLink.icon}
                aria-label={socialLink.icon}
                className="social-link"
                href={socialLink.href}
                rel="noopener noreferrer"
                target="_blank">
                <i className={classNames('fab', 'fa-2x', socialLink.icon)} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
