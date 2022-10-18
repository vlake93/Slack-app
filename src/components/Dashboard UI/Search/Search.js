import React, { useState } from "react";
import "./Search.scss";
import Clock from "../../../assets/clock.png";
import Slider from "../../../assets/slider.png";
import Glass from "../../../assets/magnifying.png";
import Help from "../../../assets/help.png";
import user from "../../../assets/user-logo.png";

function Search() {
  const mockUser = [
    { user: "Vic", email: "vic@vic.com" },
    { user: "pot", email: "pot@pot.com" },
  ];

  const completeUsers = JSON.parse(localStorage.getItem("Users")) || [];

  const [users, setUsers] = useState(completeUsers);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = (e) => {
    console.log(search);
    setSearch(e.target.value);
    // setFilteredUsers(
    //   users.filter((user) => {
    //     user.email.startsWith(search);
    //   })
    // );
    // console.log(filteredUsers);
  };

  return (
    <div className="dashboard-header">
      <form className="dashboard-search-container">
        <img className="clock-logo" src={Clock} />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
        <ul className="search-list">
          {mockUser.map((user) => {
            if (user.email.startsWith(search) & (search !== "")) {
              return <li>{user.email}</li>;
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
