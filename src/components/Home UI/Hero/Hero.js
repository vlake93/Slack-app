import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Google from "../../../assets/google sign.png";
import Airbnb from "../../../assets/airbnb.png";
import Nasa from "../../../assets/nasa.png";
import Uber from "../../../assets/uber.png";
import Target from "../../../assets/target.png";
import NYT from "../../../assets/nyt.png";
import Etsy from "../../../assets/etsy.png";
import VidOne from "../../../assets/slackvid1.webm";
import VidTwo from "../../../assets/slackvid2.webm";
import "./Hero.scss";

function Hero() {
  return (
    <div className="home-hero">
      <div className="hero-first-row">
        <div className="home-hero-container">
          <div className="hero-header">
            <h1>
              Great teamwork starts with a <span>digital HQ</span>
            </h1>
            <p>
              With all your people, tools and communication in one place, you
              can work faster and more flexibly than ever before.
            </p>
          </div>
          <div className="home-hero-cta">
            <div className="hero-header-buttons">
              <Link to="/signup" className="hero-signup">
                SIGN UP WITH EMAIL
              </Link>
              <button className="hero-google-button">
                <img src={Google} className="google-signin-logo" />
                SIGN UP WITH GOOGLE
              </button>
            </div>
            <h3>Slack is free to try for as long as you'd like</h3>
          </div>
        </div>
        <div className="hero-video-container">
          <video autoPlay={true} muted loop>
            <source src={VidOne} type="video/webm" />
          </video>
        </div>
      </div>
      <div className="hero-second-row">
        <div className="second-row-header">
          <h3>Trusted by companies all over the world</h3>
          <div className="second-row-images">
            <img src={Airbnb} />
            <img src={Nasa} />
            <img src={Uber} />
            <img src={Target} />
            <img src={NYT} />
            <img src={Etsy} />
          </div>
        </div>
        <div className="second-row-video-text">
          <video autoPlay={true} muted loop>
            <source src={VidTwo} type="video/webm" />
          </video>
          <div className="second-row-text">
            <h2>Bring your team together</h2>
            <p>
              At the heart of Slack are channels: organized spaces for everyone
              and everything you need for work. In channels, it's easier to
              connect across departments, offices, time zones and even other
              companies
            </p>
            <h3>Learn more about channels</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
