import React, { useState } from "react";
import "./AddMember.scss";

function AddMember({ toggleAdd, memberModal }) {
  const [member, setMember] = useState("");
  const [added, setAdded] = useState({});
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");

  const channelID = JSON.parse(localStorage.getItem("channelID")) || [];
  const completeUsers = JSON.parse(localStorage.getItem("Users")) || [];

  const handleSearchMember = (e) => {
    setMember(e.target.value);
  };

  const chooseMember = (user) => {
    setAdded(user);
  };

  return (
    <>
      <button className="channel-create" onClick={toggleAdd}>
        <img src="" />
        Add member
      </button>
      {memberModal && (
        <div className="create-modal">
          <form>
            <label>
              Channel members
              <input type="text" value={member} onChange={handleSearchMember} />
            </label>
            <h2>Members added:</h2>
            {/* <ul className="members-added">
              {emailList.map((user) => {
                return <li onClick={() => {}}>{user}</li>;
              })}
            </ul> */}
            <ul className="members-list">
              {completeUsers.data.map((user) => {
                if (user.email.startsWith(member) && member !== "") {
                  return (
                    <li
                      // key={forceKey}
                      onClick={() => {
                        chooseMember(user);
                        setMember("");
                        // console.log("Added", added);
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
                // createChannel();
                setAdded();
              }}
            >
              Create channel
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
