import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import CreateModal from "../Create Channel/CreateModal";

function Sidebar({ handleReplace }) {
  const [createModal, setCreateModal] = useState(false);
  const [channel, setChannel] = useState({ data: [] });
  const [channelDetail, setChannelDetail] = useState("");
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");

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
  }, [, channelDetail, channelDependency]);

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
          <ul key={channelDetail} className="channel-list">
            <CreateModal
              createModal={createModal}
              toggleCreate={toggleCreate}
            ></CreateModal>

            {channel.data.map((channel) => {
              return (
                <li>
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
      </div>
      <div className="dashboard-ui-sidebar-fourth">
        <h2>Put channel here</h2>
        <img />
      </div>
    </div>
  );
}

export default Sidebar;
