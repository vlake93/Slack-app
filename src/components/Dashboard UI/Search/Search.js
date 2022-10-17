import React from "react";
import "./Search.scss";
import Clock from "../../../assets/clock.png";
import Slider from "../../../assets/slider.png";
import Glass from "../../../assets/magnifying.png";
import Help from "../../../assets/help.png";
import user from "../../../assets/user-logo.png";

function Search() {
  const completeUsers = JSON.parse(localStorage.getItem("Users")) || [];

  return (
    <div className="dashboard-header">
      <form className="dashboard-search-container">
        <img className="clock-logo" src={Clock} />
        <input type="text" placeholder="Search" />
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
