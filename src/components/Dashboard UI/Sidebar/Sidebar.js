import React, { useEffect, useState, useReducer } from "react";
import "./Sidebar.scss";
import CreateModal from "../Create Channel/CreateModal";
import chat from "../../../assets/chat.png";
import at from "../../../assets/at.png";
import plane from "../../../assets/plane.png";
import dots from "../../../assets/dots.png";
import lock from "../../../assets/lock.png";

function Sidebar({ handleReplace }) {
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [createModal, setCreateModal] = useState(false);
  const [channel, setChannel] = useState({ data: [] });
  const [channelDetail, setChannelDetail] = useState("");

  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");
  const receiver = JSON.parse(localStorage.getItem("receiver")) || {};

  const fetchUserChannels = async () => {
    return await fetch("http://206.189.91.54/api/v1/channels", {
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
        if (!result.errors) {
          setChannel(result);
        }
        return result;
      });
  };

  const handleChannel = (user) => {
    localStorage.setItem("receiver", JSON.stringify(user));
    localStorage.setItem("channelID", JSON.stringify(user.id));
  };

  const channelID = JSON.parse(localStorage.getItem("channelID"));
  const channelDependency = JSON.parse(
    localStorage.getItem("channelDependency")
  );

  const messaged = JSON.parse(localStorage.getItem("message")) || [];

  const fetchChannelDetails = async () => {
    return await fetch(`http://206.189.91.54/api/v1/channels/${channelID}`, {
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
        forceUpdate();
        localStorage.setItem(
          "channelMembers",
          JSON.stringify(result.data.channel_members)
        );
        console.log(result.data.channel_members);
        return result;
      });
  };

  useEffect(() => {
    (async () => {
      await fetchUserChannels();
    })();
  }, [, channelDetail, channelDependency, reducerValue]);

  useEffect(() => {
    (async () => {
      await fetchChannelDetails();
    })();
  }, [, channelDependency]);

  const toggleCreate = () => {
    setCreateModal(!createModal);
  };

  const handlerChannelDetail = () => {
    setChannelDetail(Math.random());
  };

  return (
    <div className="dashboard-ui-sidebar">
      <div className="dashboard-ui-sidebar-first">
        <h2>Vic Slack</h2>
        <img />
      </div>
      <div className="dashboard-ui-sidebar-second">
        <h2>
          <img src={chat} />
          Threads
        </h2>
        <h2>
          <img className="at" src={at} />
          Mentions & reactions
        </h2>
        <h2>
          <img src={plane} />
          Drafts & sent
        </h2>
        <h2>
          <img src={dots} />
          More
        </h2>
      </div>
      <div className="dashboard-ui-sidebar-third">
        <div>
          <h2>Channels</h2>
          <ul key={channelDetail} className="channel-list">
            <CreateModal
              createModal={createModal}
              toggleCreate={toggleCreate}
              forceUpdate={forceUpdate}
            ></CreateModal>

            {channel.data.map((channel) => {
              return (
                <li>
                  <img src={lock} />
                  <h2
                    onClick={() => {
                      handleChannel(channel);
                      fetchChannelDetails();
                      handleReplace();
                      handlerChannelDetail();
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
        <ul>
          {messaged.map((user) => {
            return <li>{user.uid}</li>;
          })}
        </ul>
        {/* onClick add setlocalstorage receiver */}
      </div>
      <div className="dashboard-ui-sidebar-fourth">
        <h2>{receiver.uid || receiver.name}</h2>
        <img />
      </div>
    </div>
  );
}

export default Sidebar;
