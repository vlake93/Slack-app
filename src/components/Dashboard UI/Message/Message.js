import React, { useEffect } from "react";
import "./Message.scss";
import line from "../../../assets/line.png";
import bold from "../../../assets/bold2.png";
import italic from "../../../assets/italic.png";
import strike from "../../../assets/strike.png";
import link from "../../../assets/link.png";
import ordered from "../../../assets/ordered.png";
import unordered from "../../../assets/unordered.png";
import blockquote from "../../../assets/blockquote.png";
import code from "../../../assets/code.png";
import LogoutModal from "../../../components/Dashboard UI/Logout Modal/LogoutModal";

function Message() {
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");

  const fetchMessage = () => {
    fetch(
      "http://206.189.91.54/api/v1/messages?receiver_id=1&receiver_class=User",
      {
        method: "GET",
        headers: {
          "access-token": accessToken,
          client: client,
          expiry: expiry,
          uid: uid,
          "Content-Type": "application/json",
        },
        receiver_id: "2783",
        receiver_class: "User",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("message data", data);
        return data;
      });
  };

  useEffect(() => {
    fetchMessage();
  });

  return (
    <div className="dashboard-ui-main">
      <div className="dashboard-ui-main-channel">
        <h2>Put channel/user here</h2>
      </div>
      <div className="dashboard-ui-main-message">
        <LogoutModal></LogoutModal>
      </div>
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
  );
}

export default Message;
