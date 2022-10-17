import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/slack.svg";
import Apple from "../../assets/apple.png";
import Google from "../../assets/google sign.png";
import Globe from "../../assets/globe.png";
import Down from "../../assets/down2.png";
import "./SignUpPage.scss";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // setEmail("");
    // setPassword("");

    const credentials = {
      email: email,
      password: password,
      password_confirmation: password,
    };

    fetch("http://206.189.91.54/api/v1/auth/", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 422) {
          setError("Email already taken");
          return response.json();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data.status);
        if (data.status !== "error") {
          navigate("/");
        }
      });
  };

  return (
    <div className="signup-page">
      <img className="signup-logo" src={Logo} />
      <h1>First, enter your email</h1>
      <p>
        We suggest using the <span>email address you use at work</span>
      </p>
      <form>
        <h1>{error}</h1>
        <input
          type="text"
          className="signup-email"
          placeholder="name@work-email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          className="signup-password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={handleRegister}
          type="submit"
          className="signup-email-button"
        >
          Continue
        </button>
      </form>
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
