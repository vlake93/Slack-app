import React, { useState } from "react";
import "./CreateModal.scss";
import add from "../../../assets/add.png";

function CreateModal({ createModal, toggleCreate, forceKey, forceUpdate }) {
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");

  const channelCreator = JSON.parse(localStorage.getItem("signedIn")) || [];
  const [member, setMember] = useState("");
  const [channelName, setChannelName] = useState("");
  const [added, setAdded] = useState([channelCreator]);

  const completeUsers = JSON.parse(localStorage.getItem("Users")) || [];

  const idList = added.map((id) => {
    return id.id;
  });

  const emailList = added.map((id) => {
    return id.uid;
  });

  const createChannelBody = {
    name: channelName,
    user_ids: idList,
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
        forceUpdate();
        return result;
      });
  };

  const chooseMember = (user) => {
    setAdded([...added, user]);
  };

  const handleSearchMember = (e) => {
    setMember(e.target.value);
  };

  const handleChannelName = (e) => {
    setChannelName(e.target.value);
  };

  return (
    <>
      <button className="channel-create" onClick={toggleCreate}>
        <img src={add} />
        Create Channel
      </button>
      {createModal && (
        <div className="create-modal">
          <div className="create-overlay" onClick={toggleCreate}></div>
          <div className="create-modal-content">
            <div>
              <h2>Create new channel</h2>
              <form>
                <label>
                  Channel name
                  <input
                    type="text"
                    value={channelName}
                    onChange={handleChannelName}
                    required
                    minLength={5}
                  />
                </label>
                <label>
                  Channel members
                  <input
                    type="text"
                    value={member}
                    onChange={handleSearchMember}
                  />
                </label>
                <h2>Members added:</h2>
                <ul className="members-added">
                  {emailList.map((user) => {
                    return <li onClick={() => {}}>{user}</li>;
                  })}
                </ul>
                <ul className="members-list">
                  {completeUsers.data.map((user) => {
                    if (user.email.startsWith(member) && member !== "") {
                      return (
                        <li
                          onClick={() => {
                            chooseMember(user);
                            setMember("");
                            console.log("Added", added);
                          }}
                        >
                          {user.email}
                        </li>
                      );
                    }
                  })}
                </ul>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    createChannel();
                    // localStorage.setItem(
                    //   "channelDependency",
                    //   JSON.stringify(Math.random())
                    // );
                    setAdded([channelCreator]);
                    toggleCreate();
                  }}
                >
                  Create channel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateModal;
