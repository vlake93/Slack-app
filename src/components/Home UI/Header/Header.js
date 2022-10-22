import React from "react";
import "./Header.scss";
import Glass from "../../../assets/magnifying.png";
import Slack from "../../../assets/slack.png";
import Down from "../../../assets/down.png";
import { Link } from "react-router-dom";

function Header() {
  const signedIn = localStorage.getItem("signedIn");

  const check = () => {
    if (signedIn) {
      return "/client";
    } else {
      return "/signin";
    }
  };
  console.log(check());

  return (
    <div className="home-header">
      <nav className="home-nav">
        <ul className="home-nav-left">
          <div className="slack-logo-container">
            <img src={Slack}></img>
            <p>slack</p>
          </div>
          <p className="home-nav-product">
            Product <img className="product-arrow" src={Down} />
          </p>
          <p>Solutions</p>
          <p>Enterprise</p>
          <p>Resources</p>
          <p>Pricing</p>
        </ul>
        <ul className="home-nav-right">
          <img src={Glass} />
          <Link to={check()} className="nav-right-link">
            Sign in
          </Link>
          <div className="home-nav-right-buttons">
            <button className="sales-button">TALK TO SALES</button>
            <button className="free-button">TRY FOR FREE</button>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
