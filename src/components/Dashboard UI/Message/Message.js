import React, { useEffect, useState } from "react";
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

function Message({ onForce, parKey }) {
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");

  const receiver = JSON.parse(localStorage.getItem("receiver")) || {};

  const currentReceiver = receiver.id || {};

  const fetchMessage = () => {
    fetch(
      `http://206.189.91.54/api/v1/messages?receiver_id=${currentReceiver}&receiver_class=User`,
      {
        method: "GET",
        headers: {
          "access-token": accessToken,
          client: client,
          expiry: expiry,
          uid: uid,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("message data", data.data);
        localStorage.setItem("messages", JSON.stringify(data.data || []));
        return data;
      });
  };

  const currentMessage = JSON.parse(localStorage.getItem("messages")) || [];

  useEffect(() => {
    fetchMessage();
  });

  return (
    <div className="dashboard-ui-main">
      <div className="dashboard-ui-main-receiver">
        <div className="receiver-display" key={parKey}>
          <h2>TO:</h2>
          <h2>{receiver.uid}</h2>
          {receiver.uid && <button onClick={onForce}>x</button>}
        </div>
      </div>
      <div className="dashboard-ui-main-message">
        <LogoutModal></LogoutModal>
        <div>
          {currentMessage.map((message) => {
            return <div>{message.body}</div>;
          })}
        </div>
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
