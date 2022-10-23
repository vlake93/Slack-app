import React, { useState, useEffect, useReducer } from "react";
import "./ChannelMember.scss";

function ChannelMember() {
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [channelMembers, setChannelMembers] = useState("");
  const channelID = JSON.parse(localStorage.getItem("channelID"));

  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");

  const fetchChannelDetails = () => {
    return fetch(`http://206.189.91.54/api/v1/channels/${channelID}`, {
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
        setChannelMembers(result.data.channel_members.length);
        forceUpdate();
        return result;
      });
  };

  useEffect(() => {
    fetchChannelDetails();
  }, [, reducerValue]);

  return (
    <div className="channel-members">
      <h2>Members:</h2>
      <h2>{channelMembers}</h2>
    </div>
  );
}

export default ChannelMember;
