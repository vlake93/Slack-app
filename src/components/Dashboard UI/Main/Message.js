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
import sub from "../../../assets/receiver.png";
import AddMember from "../Add Member/AddMember";
import ChannelMember from "../Channel Member/ChannelMember";

function Message({ handleRemove, forceKey }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState("");
  const [memberCount, setMemberCount] = useState("");
  const [memberModal, setMemberModal] = useState(false);
  const [messagedUsers, setMessageUsers] = useState([]);

  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");
  const signedIn = JSON.parse(localStorage.getItem("signedIn"));
  const receiver = JSON.parse(localStorage.getItem("receiver")) || {};
  const messageState = localStorage.getItem("messageState");
  const currentReceiver = receiver.id || {};
  const presentMessage = messageList || [];

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

  ///////////////// filter so no has same id
  const setMessaged = (user) => {
    messagedUsers.filter((messaged) => {
      if (!messaged.id.includes(user.id)) {
        return setMessageUsers([...messagedUsers, user]);
      }
    });
  };

  const receiverPlaceHolder = () => {
    if (receiver.uid) {
      return `Message ${receiver.uid}`;
    } else if (receiver.name) {
      return `Message ${receiver.name}`;
    } else {
      return "Message";
    }
  };

  const toggleMember = () => {
    setMemberModal(!memberModal);
  };

  const userImage = (id, messaged) => {
    if (id === messaged) {
      return sub;
    } else {
      return main;
    }
  };

  const userName = (id, sender) => {
    if (id === sender) {
      return sender;
    } else {
      return "You";
    }
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
          return data;
        });
    }
  };

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
                    <img className="channel-detail-line" src={line} />
                    <AddMember
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
              // {(message.sender.email === signedIn && (}
              <div className="main-message">
                <img
                  src={userImage(
                    parseInt(receiver.id),
                    parseInt(message.sender.id)
                  )}
                />
                <div>
                  <div className="message-date">
                    <h3>{userName(receiver.uid, message.sender.uid)}</h3>
                    <h3>{message.created_at}</h3>
                  </div>
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
              fetchMessage();
              localStorage.setItem("messageState", Math.random());
              setMessaged(receiver);
              localStorage.setItem(
                `${signedIn}`,
                JSON.stringify(messagedUsers)
              );
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder={receiverPlaceHolder()}
              // onSubmit={() => {
              //   setMessaged(receiver);
              //   localStorage.setItem("message", JSON.stringify(messagedUsers));
              // }}
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
