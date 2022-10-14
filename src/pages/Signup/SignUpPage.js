import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/slack.svg";
import Apple from "../../assets/apple.png";
import Google from "../../assets/google sign.png";
import Globe from "../../assets/globe.png";
import Down from "../../assets/down2.png";
import "./SignUpPage.scss";

function SignUpPage() {
  return (
    <div className="signup-page">
      <img className="signup-logo" src={Logo} />
      <h1>First, enter your email</h1>
      <p>
        We suggest using the <span>email address you use at work</span>
      </p>
      <input
        type="text"
        className="signup-email"
        placeholder="name@work-email.com"
      />
      <input
        type="password"
        className="signup-password"
        placeholder="password"
      />
      <button className="signup-email-button">Continue</button>
      <div className="signup-or-container">
        <hr></hr>
        <p className="signup-or">OR</p>
        <hr></hr>
      </div>
      <button className="signup-google-button">
        <img src={Google} className="google-button-logo" />
        Continue with Google
      </button>
      <button className="signup-apple-button">
        <img className="apple-button-logo" src={Apple} />
        Continue with Apple
      </button>
      <div className="signup-bottom-text">
        <p>Already using Slack?</p>
        <Link to="/signin" className="existing-link">
          Sign in to an existing workspace
        </Link>
      </div>
      <footer className="signup-footer">
        <p>Privacy & Terms</p>
        <p>Contact Us</p>
        <p>
          <img src={Globe} /> Change region <img className="down" src={Down} />
        </p>
      </footer>
    </div>
  );
}

export default SignUpPage;
