import React, { useEffect } from "react";
import "./Dashboard.scss";
import Clock from "../../assets/clock.png";
import Slider from "../../assets/slider.png";
import Glass from "../../assets/magnifying.png";
import Help from "../../assets/help.png";
import SignIn from "../SignIn/SignIn";

function Dashboard() {
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");
  const signedIn = localStorage.getItem("signedIn");

  const fetchUsers = () => {
    fetch("http://206.189.91.54/api/v1/users", {
      method: "GET",
      headers: {
        "access-token": accessToken,
        client,
        expiry,
        uid,
      },
    })
      .then((response) => {
        response.json();
      })
      .then((result) => {
        console.log(result);
      });
  };

  useEffect(() => {
    fetchUsers();
  });

  if (signedIn) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-search-container">
            <img className="clock-logo" src={Clock} />
            <input type="text" placeholder="Search" />
            <img className="slider-logo" src={Slider} />
            <img className="glass-logo" src={Glass} />
          </div>
          <div className="header-help-container">
            <img className="help-logo" src={Help} />
            <img />
          </div>
        </div>
        <div className="dashboard-ui">
          <div className="dashboard-ui-sidebar">
            <div className="dashboard-ui-sidebar-first">
              <h2>Vic</h2>
              <img />
            </div>
            <div className="dashboard-ui-sidebar-second">
              <h2>
                <img />
                Threads
              </h2>
              <h2>
                <img />
                Mentions & reactions
              </h2>
              <h2>
                <img />
                More
              </h2>
            </div>
            <div className="dashboard-ui-sidebar-third">
              <div>Channels</div>
              <div>Direct messages</div>
            </div>
            <div className="dashboard-ui-sidebar-fourth">
              <h2></h2>
              <img />
            </div>
          </div>
          <div className="dashboard-ui-main">
            <div></div>
          </div>
          {/* <div className="dashboard-ui-thread"></div> */}
        </div>
      </div>
    );
  } else {
    return <SignIn></SignIn>;
  }
}

export default Dashboard;
