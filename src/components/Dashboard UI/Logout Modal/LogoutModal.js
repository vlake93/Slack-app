import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutModal.scss";

function LogoutModal() {
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSignOut = () => {
    localStorage.removeItem("signedIn");
    navigate("/");
  };

  const uid = localStorage.getItem("uid");
  return (
    <>
      <button className="open-modal" onClick={toggleModal}></button>
      {modal && (
        <div className="logout">
          <div className="overlay" onClick={toggleModal}></div>
          <div>
            <img></img>
            <div className="logout-name">
              <h2>{uid}</h2>
              <p>Active</p>
            </div>
          </div>
          <div className="logout-status">
            <img></img>
            <h2>Update your status</h2>
          </div>
          <div className="logout-away">
            <h2>Set yourself as away</h2>

            <h2>Pause notification</h2>
          </div>
          <div className="logout-profile">
            <h2>Profile</h2>
            <h2>Preferences</h2>
          </div>
          <div>
            <h2 className="sign-out" onClick={handleSignOut}>
              Sign out
            </h2>
          </div>
        </div>
      )}
    </>
  );
}

export default LogoutModal;
