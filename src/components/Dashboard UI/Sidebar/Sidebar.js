import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

function Sidebar({ handleReplace }) {
  const [channelName, setChannelName] = useState("");
  const [members, setMembers] = useState([]);
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");

  const fetchUserChannels = () => {
    fetch("http://206.189.91.54/api/v1/channels", {
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
        console.log("result", result);
        if (result.errors === "No available channels.") {
          localStorage.setItem("Channels", JSON.stringify({ data: [] }));
        } else {
          localStorage.setItem("Channels", JSON.stringify(result) || []);
        }
        return result;
      });
  };

  const createChannelBody = {
    name: channelName,
    user_ids: members,
  };

  const createChannel = () => {
    fetch("http://206.189.91.54/api/v1/channels", {
      method: "POST",
      headers: {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: uid,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createChannelBody),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log("result", result);
        if (result.errors === "No available channels.") {
          localStorage.setItem("Channels", JSON.stringify({ data: [] }));
        } else {
          localStorage.setItem("Channels", JSON.stringify(result) || []);
        }
        return result;
      });
  };

  const handleChannel = (user) => {
    localStorage.setItem("receiver", JSON.stringify(user));
  };

  useEffect(() => {
    fetchUserChannels();
  });

  const userChannels = JSON.parse(localStorage.getItem("Channels")) || [];
  console.log("LocalChannel", userChannels);

  return (
    <div className="dashboard-ui-sidebar">
      <div className="dashboard-ui-sidebar-first">
        <h2>Workspace here</h2>
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
          Drafts & sent
        </h2>
        <h2>
          <img />
          More
        </h2>
      </div>
      <div className="dashboard-ui-sidebar-third">
        <div>
          <h2>Channels</h2>
          <button>Create channel</button>
          <ul className="channel-list">
            {userChannels.data.map((channel) => {
              return (
                <li>
                  <h2
                    onClick={() => {
                      handleReplace();
                      handleChannel(channel);
                    }}
                    className="channel"
                  >
                    {channel.name}
                  </h2>
                </li>
              );
            })}
          </ul>
        </div>
        <h2>Direct messages</h2>
      </div>
      <div className="dashboard-ui-sidebar-fourth">
        <h2>Put channel here</h2>
        <img />
      </div>
    </div>
  );
}

export default Sidebar;
