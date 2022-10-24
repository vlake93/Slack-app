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
  const signedIn = JSON.parse(localStorage.getItem("signedIn"));
  const localMessaged =
    JSON.parse(localStorage.getItem(`${signedIn.uid}messaged`)) || [];
  const channelID = JSON.parse(localStorage.getItem("channelID"));
  const channelDependency = JSON.parse(
    localStorage.getItem("channelDependency")
  );

  //////////////////////////////////////////////////////////////
  // const sample = [
  //   { id: 345, name: "john" },
  //   { id: 234, name: "smith" },
  //   { id: 789, name: "hey" },
  //   { id: 345, name: "bill" },
  //   { id: 345, name: "doe" },
  //   { id: 112, name: "jane" },
  // ];

  // const yeah = sample.filter((user) => {
  //   sample.map((id) => {
  //
  //   });
  // });
  //////////////////////////////////////////////////////////

  const toggleCreate = () => {
    setCreateModal(!createModal);
  };

  const handlerChannelDetail = () => {
    setChannelDetail(Math.random());
  };

  const handleChannel = (user) => {
    localStorage.setItem("receiver", JSON.stringify(user));
    localStorage.setItem("channelID", JSON.stringify(user.id));
  };

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
          {localMessaged.map((user) => {
            return <li>{user.uid}</li>;
          })}
        </ul>
      </div>
      <div className="dashboard-ui-sidebar-fourth">
        <h2>{receiver.uid || receiver.name}</h2>
        <img />
      </div>
    </div>
  );
}

export default Sidebar;
