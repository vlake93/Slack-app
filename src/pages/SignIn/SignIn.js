import React from "react";
import { useState } from "react";
import Logo from "../../assets/slack.svg";
import Apple from "../../assets/apple.png";
import Google from "../../assets/google sign.png";
import Globe from "../../assets/globe.png";
import Down from "../../assets/down2.png";
import Sparkle from "../../assets/sparkle.png";
import "./SignIn.scss";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const addCredentials = (key, value) => {
    localStorage.setItem(key, value);
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/client`;
    navigate(path);
  };

  // const preventDefault = (e) => {
  //   e.preventDefault();
  // };

  const handleSignIn = (e) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };

    fetch("http://206.189.91.54/api/v1/auth/sign_in", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.headers.forEach((val, key) => {
          console.log(key + "->" + val);
          if (
            key === "access-token" ||
            key === "uid" ||
            key === "expiry" ||
            key === "client"
          ) {
            addCredentials(key, val);
          }
        });
        return response.json();
      })
      .then((result) => {
        navigate("/client");
        addCredentials("signedIn", 1);
        console.log(result);
      });

    // const accessToken = localStorage.getItem("access-token");
    // const client = localStorage.getItem("client");
    // const expiry = localStorage.getItem("expiry");
    // const uid = localStorage.getItem("uid");

    // if (localStorage.getItem("access-token")) {
    //   routeChange();
    // } else {
    //   // preventDefault();
    //   setError("Incorrect email/password");
    // }
  };

  return (
    <div className="signin-page">
      <div className="signin-logo-container">
        <img className="signin-logo" src={Logo} />
        <div className="new-slack">
          <p className="new-slack-text">New to Slack?</p>
          <Link to="/signup" className="new-slack-link">
            Create an account?
          </Link>
        </div>
      </div>
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
      <div>{error}</div>
      <form>
        <input
          type="text"
          className="signin-email"
          placeholder="name@work-email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          className="signin-password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={handleSignIn}
          type="submit"
          className="signin-email-button"
        >
          Sign In with Email
        </button>
      </form>
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
