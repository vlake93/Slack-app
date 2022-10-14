import React from "react";
import Logo from "../../assets/slack.svg";
import Apple from "../../assets/apple.png";
import Google from "../../assets/google sign.png";
import Globe from "../../assets/globe.png";
import Down from "../../assets/down2.png";
import Sparkle from "../../assets/sparkle.png";
import "./SignIn.scss";

function SignIn() {
  return (
    <div className="signin-page">
      <img className="signin-logo" src={Logo} />
      <h1>Sign in to Slack</h1>
      <p>
        We suggest using the <span>email address you use at work</span>
      </p>
      <button className="signin-google-button">
        <img src={Google} className="google-button-logo" />
        Sign in with Google
      </button>
      <button className="signin-apple-button">
        <img className="apple-button-logo" src={Apple} />
        Sign in with Apple
      </button>
      <div className="signin-or-container">
        <hr></hr>
        <p className="signin-or">OR</p>
        <hr></hr>
      </div>
      <input
        type="text"
        className="signin-email"
        placeholder="name@work-email.com"
      />
      <input
        type="password"
        className="signin-password"
        placeholder="password"
      />
      <button className="signin-email-button">Sign In with Email</button>
      <div className="signin-email-bottom-text">
        <p>
          <img src={Sparkle} />
          We'll email you a magic code for a password-free sign in. Or you can{" "}
          <span>sign in manually instead</span>
        </p>
      </div>
      <footer className="signin-footer">
        <p>Privacy & Terms</p>
        <p>Contact Us</p>
        <p>
          <img src={Globe} /> Change region <img className="down" src={Down} />
        </p>
      </footer>
    </div>
  );
}

export default SignIn;
