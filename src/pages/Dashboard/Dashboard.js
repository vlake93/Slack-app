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

  // const receiver = JSON.parse(localStorage.getItem("receiver")) || {};

  // // const [message, setMessage] = useState("");
  // const [messageList, setMessageList] = useState("");

  // const currentReceiver = receiver.id || {};

  // const fetchMessage = () => {
  //   if (receiver.owner_id) {
  //     fetch(
  //       `http://206.189.91.54/api/v1/messages?receiver_id=${currentReceiver}&receiver_class=Channel`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "access-token": accessToken,
  //           client: client,
  //           expiry: expiry,
  //           uid: uid,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log("message data", data.data);
  //         setMessageList(data.data);
  //         console.log("message state", messageList);
  //         // localStorage.setItem("messages", JSON.stringify(data.data || []));
  //         return data;
  //       });
  //   } else {
  //     fetch(
  //       `http://206.189.91.54/api/v1/messages?receiver_id=${currentReceiver}&receiver_class=User`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "access-token": accessToken,
  //           client: client,
  //           expiry: expiry,
  //           uid: uid,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log("message data", data.data);
  //         setMessageList(data.data);
  //         console.log("message state", messageList);
  //         // localStorage.setItem("messages", JSON.stringify(data.data || []));
  //         return data;
  //       });
  //   }
  // };
  ///////////////////////////////////////////////////////////////////////////////

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

  // useEffect(() => {
  //   forceReplace();
  // });

  useEffect(() => {
    //another way
    (async () => {
      const userData = await fetchUsers();
      console.log("this is", userData);
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
