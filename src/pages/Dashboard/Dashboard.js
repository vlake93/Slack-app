import React, { useEffect, useState } from "react";
import SignIn from "../SignIn/SignIn";
import Search from "../../components/Dashboard UI/Search/Search";
import "./Dashboard.scss";
import Sidebar from "../../components/Dashboard UI/Sidebar/Sidebar";
import Message from "../../components/Dashboard UI/Message/Message";

function Dashboard() {
  const [rerenderer, setRerenderer] = useState("");

  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");
  const signedIn = localStorage.getItem("signedIn");

  const fetchUsers = async () => {
    return await fetch("http://206.189.91.54/api/v1/users", {
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
        localStorage.setItem("Users", JSON.stringify(result));
        return result;
      });
  };

  const forceRemove = () => {
    localStorage.removeItem("receiver");
    setRerenderer(Math.random());
  };

  const forceReplace = () => {
    setRerenderer(Math.random());
  };

  useEffect(() => {
    //another way
    (async () => {
      const userData = await fetchUsers();
      console.log("this is", userData);
    })();
    // another way
    // const asyncFunc = async () => {
    //   const userData = await fetchUsers();
    //   console.log("this is", userData);
    // };
    // asyncFunc();
  });

  const completeUsers = JSON.parse(localStorage.getItem("Users")) || {};

  if (signedIn) {
    return (
      <div className="dashboard">
        <Search onForce={forceReplace} parKey={rerenderer}></Search>
        <div className="dashboard-ui">
          <Sidebar></Sidebar>
          <Message onForce={forceRemove} parKey={rerenderer}></Message>
        </div>
      </div>
    );
  } else {
    return <SignIn></SignIn>;
  }
}

export default Dashboard;
