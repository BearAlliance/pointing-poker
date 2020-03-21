import React from 'react';
import { Link } from 'react-router-dom';

function HomeLevel() {
  return (
    <section className="tile is-vertical is-parent">
      <div className="tile is-child box">
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Price</p>
              <p className="title">Free</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Ads</p>
              <p className="title">None</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Self-hosting</p>
              <p className="title">You bet!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero splash">
        <div className="hero-body has-text-centered-mobile">
          <h1 className="title splash-text">Pointing Poker</h1>
          <h2 className="subtitle">Where everything's made up but the points still matter</h2>
        </div>
      </section>

      <HomeLevel />

      <section className="section">
        <div className="container">
          <h2 className="subtitle">Lorem Ipsum this is a description</h2>
        </div>
      </section>
    </div>
  );
}
