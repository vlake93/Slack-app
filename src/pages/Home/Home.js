import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Home UI/Header/Header";
import Hero from "../../components/Home UI/Hero/Hero";
import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <Header></Header>
      <Hero></Hero>
    </div>
  );
}

export default Home;
