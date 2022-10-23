import React, { useState } from "react";
import "./AddMember.scss";

function AddMember({ toggleMember, memberModal, memberState }) {
  const [member, setMember] = useState("");
  const [added, setAdded] = useState({});
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");

  const channelID = JSON.parse(localStorage.getItem("channelID"));
  const completeUsers = JSON.parse(localStorage.getItem("Users")) || [];

  const handleSearchMember = (e) => {
    setMember(e.target.value);
  };

  const chooseMember = (user) => {
    setAdded(user);
  };

  const channelMember = {
    id: channelID,
    member_id: added.id,
  };

  const addMember = () => {
    fetch("http://206.189.91.54/api/v1/channel/add_member", {
      method: "POST",
      headers: {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: uid,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(channelMember),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log("result", result);

        return result;
      });
  };

  const handleSubmit = () => {
    toggleMember();
  };

  return (
    <>
      <button
        className="channel-add"
        onClick={() => {
          toggleMember();
          console.log(member);
        }}
      >
        <img src="" />
        Add member
      </button>
      {memberModal && (
        <div className="add-modal">
          <div className="add-overlay" onClick={toggleMember}></div>
          <form
            className="add-form"
            onSubmit={() => {
              handleSubmit();
            }}
          >
            <h1>Add member</h1>
            <label>Search members</label>
            <input type="text" value={member} onChange={handleSearchMember} />
            <div>
              <h2>Member added:</h2>
              <h2>{added.uid}</h2>
            </div>
            <ul className="add-list">
              {completeUsers.data.map((user) => {
                if (user.email.startsWith(member) && member !== "") {
                  return (
                    <li
                      onClick={() => {
                        chooseMember(user);
                        setMember("");
                        console.log("Added", added);
                        console.log("AddedID", added.id);
                      }}
                    >
                      {user.email}
                    </li>
                  );
                }
              })}
            </ul>
            <button
              className="add-member-button"
              onClick={(e) => {
                e.preventDefault();
                addMember();
                setAdded("");
                toggleMember();
                memberState();
              }}
            >
              Add member
            </button>
          </form>
          {/* //{" "} */}
        </div>
        //   </div>
        // </div>
      )}
    </>
  );
}

export default AddMember;
