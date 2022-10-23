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
import LogoutModal from "../Logout Modal/LogoutModal";
import main from "../../../assets/main-user.png";
import receiver from "../../../assets/receiver.png";
import AddMember from "../Add Member/AddMember";
import ChannelMember from "../Channel Member/ChannelMember";

function Message({ handleRemove, forceKey }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState("");
  const [memberCount, setMemberCount] = useState("");
  const [memberModal, setMemberModal] = useState(false);

  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");

  const receiver = JSON.parse(localStorage.getItem("receiver")) || {};

  const currentReceiver = receiver.id || {};

  const toggleMember = () => {
    setMemberModal(!memberModal);
  };

  const memberState = () => {
    setMemberCount(Math.random());
  };

  const fetchMessage = async () => {
    if (receiver.owner_id) {
      return await fetch(
        `http://206.189.91.54/api/v1/messages?receiver_id=${currentReceiver}&receiver_class=Channel`,
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
          setMessageList(data.data);

          return data;
        });
    } else {
      return await fetch(
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
          setMessageList(data.data);

          return data;
        });
    }
  };

  const userBody = {
    receiver_id: receiver.id,
    receiver_class: "User",
    body: message,
  };

  const channelBody = {
    receiver_id: receiver.id,
    receiver_class: "Channel",
    body: message,
  };

  const presentMessage = messageList || [];

  const sendMessage = () => {
    if (receiver.owner_id) {
      fetch(`http://206.189.91.54/api/v1/messages`, {
        method: "POST",
        headers: {
          "access-token": accessToken,
          client: client,
          expiry: expiry,
          uid: uid,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(channelBody),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log("message data", data.data);
          return data;
        });
    } else {
      fetch(`http://206.189.91.54/api/v1/messages`, {
        method: "POST",
        headers: {
          "access-token": accessToken,
          client: client,
          expiry: expiry,
          uid: uid,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userBody),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log("message data", data.data);
          return data;
        });
    }
  };

  const messageState = localStorage.getItem("messageState");

  useEffect(() => {
    fetchMessage();
  }, [currentReceiver, messageState]);

  return (
    <div className="dashboard-ui-main">
      <div className="dashboard-ui-main-receiver">
        <div className="receiver-display" key={forceKey}>
          <div className="receiver-container">
            <h2>TO:</h2>
            <h2 className="receiver-name">{receiver.uid || receiver.name}</h2>
            {(receiver.uid && (
              <button
                className="receiver-button"
                onClick={() => {
                  handleRemove();
                }}
              >
                X
              </button>
            )) ||
              (receiver.name && (
                <div className="channel-receiver">
                  <div>
                    <button
                      className="receiver-button"
                      onClick={() => {
                        handleRemove();
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div className="channel-detail">
                    <ChannelMember
                      memberCount={memberCount}
                      memeberState={memberState}
                    ></ChannelMember>
                    <AddMember
                      // memberCount={memberCount}
                      memberState={memberState}
                      toggleMember={toggleMember}
                      memberModal={memberModal}
                    ></AddMember>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="dashboard-ui-main-message">
        <LogoutModal></LogoutModal>

        <div className="main-messages">
          {presentMessage.map((message) => {
            return (
              <div className="main-message">
                <img src={main} />
                <div>
                  <h3>{message.sender.email}</h3>
                  <h2>{message.body}</h2>
                </div>
              </div>
            );
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
              setMessage("");
              // handleReplace();
              fetchMessage();
              localStorage.setItem("messageState", Math.random());
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                console.log(message);
                // fetchMessage();
              }}
              placeholder="Message"
            />
          </form>
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
