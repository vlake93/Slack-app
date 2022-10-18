import React, { useEffect } from "react";
import SignIn from "../SignIn/SignIn";
import Search from "../../components/Dashboard UI/Search/Search";
import "./Dashboard.scss";
import line from "../../assets/line.png";
import bold from "../../assets/bold2.png";
import italic from "../../assets/italic.png";
import strike from "../../assets/strike.png";
import link from "../../assets/link.png";
import ordered from "../../assets/ordered.png";
import unordered from "../../assets/unordered.png";
import blockquote from "../../assets/blockquote.png";
import code from "../../assets/code.png";
import Sidebar from "../../components/Dashboard UI/Sidebar/Sidebar";

// import developer from "../../assets/developer.png";

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
        client: client,
        expiry: expiry,
        uid: uid,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        localStorage.setItem("Users", JSON.stringify(result));
        console.log(result);
        return result;
      });
  };

  const userData = fetchUsers();
  console.log("this is", userData);

  useEffect(() => {
    fetchUsers();
  });

  const completeUsers = JSON.parse(localStorage.getItem("Users")) || [];

  if (signedIn) {
    return (
      <div className="dashboard">
        <Search></Search>
        <div className="dashboard-ui">
          <Sidebar></Sidebar>
          <div className="dashboard-ui-main">
            <div className="dashboard-ui-main-channel">
              <h2>Put channel/user here</h2>
            </div>
            <div className="dashboard-ui-main-message"></div>
            <div className="dashboard-ui-main-compose">
              <div className="message-composer">
                <div className="message-composer-upper">
                  <img src={bold} />
                  <img src={italic} />
                  <img src={strike} />
                  <img className="line" src={line} />
                  <img src={link} />
                  <img className="line" src={line} />
                  <img className="ordered" src={ordered} />
                  <img className="ordered" src={unordered} />
                  <img className="line" src={line} />
                  <img src={blockquote} />
                  <img className="line" src={line} />
                  <img src={code} />
                  <img src={bold} />
                </div>
                <input type="text" placeholder="Message" />
                <div>
                  <img />
                  <img />
                  <img />
                  <img />
                  <img />
                  <img />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <SignIn></SignIn>;
  }
}

export default Dashboard;
