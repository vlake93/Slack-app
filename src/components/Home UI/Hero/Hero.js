import React from "react";
import Google from "../../assets/google sign.png";
import "./Hero.scss";

function Hero() {
  return (
    <div className="home-hero">
      <div className="home-hero-container">
        <div className="hero-header">
          <h1>
            Great teamwork starts with a <span>digital HQ</span>
          </h1>
          <p>
            With all your people, tools and communication in one place, you can
            work faster and more flexibly than ever before.
          </p>
        </div>
        <div className="hero-header-buttons">
          <button className="hero-email-button">SIGN UP WITH EMAIL</button>
          <button className="hero-google-button">
            <img src={Google} className="google-signin-logo" />
            SIGN UP WITH GOOGLE
          </button>
        </div>
        <h3>Slack is free to try for as long as you'd like</h3>
      </div>
    </div>
  );
}

export default Hero;
