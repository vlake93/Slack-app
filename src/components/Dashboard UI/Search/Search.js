import React, { useEffect, useState } from "react";
import "./Search.scss";
import Clock from "../../../assets/clock.png";
import Slider from "../../../assets/slider.png";
import Glass from "../../../assets/magnifying.png";
import Help from "../../../assets/help.png";
import user from "../../../assets/user-logo.png";

function Search({ handleReplace, forceKey }) {
  const completeUsers = JSON.parse(localStorage.getItem("Users")) || [1, 2];

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    console.log(search);
    setSearch(e.target.value);
  };

  const handleReceiver = (user) => {
    localStorage.setItem("receiver", JSON.stringify(user));
    setSearch("");
  };

  // useEffect(() => {
  //   handleReplace();
  // });

  return (
    <div className="dashboard-header">
      <form
        onSubmit={() => {
          handleReplace();
          window.location.reload();
        }}
        className="dashboard-search-container"
      >
        <img className="clock-logo" src={Clock} />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
        <ul className="search-list">
          {completeUsers.data.map((user) => {
            if (user.email.startsWith(search) && search !== "") {
              return (
                <li
                  // key={forceKey}
                  onClick={() => {
                    handleReplace();
                    handleReceiver(user);
                  }}
                >
                  {user.email}
                </li>
              );
            }
          })}
        </ul>
        <img className="slider-logo" src={Slider} />
        <img className="glass-logo" src={Glass} />
      </form>
      <div className="header-help-container">
        <img className="help-logo" src={Help} />
        <img className="user-logo" src={user} />
      </div>
    </div>
  );
}

export default Search;

// localStorage.setItem("Users", JSON.stringify([]));
// localStorage.setItem("Channels", JSON.stringify([]));
