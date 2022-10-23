import React, { useState, useEffect } from "react";
import "./ChannelMember.scss";

function ChannelMember({ memberCount, memeberState }) {
  const [channelMembers, setChannelMembers] = useState("");
  const [channelState, setChannelState] = useState(memberCount);
  const channelID = JSON.parse(localStorage.getItem("channelID"));

  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");

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
        setChannelMembers(result.data.channel_members.length);
        memeberState();

        // setChannelState(memberCount);
        console.log(result.data.channel_members);
        return result;
      });
  };

  useEffect(() => {
    fetchChannelDetails();
  }, [, channelMembers, memberCount]);

  return (
    <div className="channel-members">
      <h2>Members:</h2>
      <h2 key={memberCount}>{channelMembers}</h2>
    </div>
  );
}

export default ChannelMember;
