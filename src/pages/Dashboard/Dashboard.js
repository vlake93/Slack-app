import React, { useEffect, useState } from "react";
import SignIn from "../SignIn/SignIn";
import Search from "../../components/Dashboard UI/Search/Search";
import "./Dashboard.scss";
import Sidebar from "../../components/Dashboard UI/Sidebar/Sidebar";
import Message from "../../components/Dashboard UI/Main/Message";

function Dashboard() {
  const [rerender, setRerender] = useState("");

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
    setRerender(Math.random());
  };

  const forceReplace = () => {
    setRerender(Math.random());
  };

  useEffect(() => {
    (async () => {
      const userData = await fetchUsers();
    })();
  });

  if (signedIn) {
    return (
      <div className="dashboard">
        <div className="dashboard-ui">
          <Message
            handleRemove={forceRemove}
            handleReplace={forceReplace}
            forceKey={rerender}
          ></Message>
          <Sidebar handleReplace={forceReplace}></Sidebar>
        </div>
        <Search handleReplace={forceReplace} forceKey={rerender}></Search>
      </div>
    );
  } else {
    return <SignIn></SignIn>;
  }
}

export default Dashboard;
