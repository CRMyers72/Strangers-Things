import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { API } from "../App";
import { useEffect } from "react";

const Profile = ({ setToken, token, history }) => {
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const resp = await fetch(`${API}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setUserData(resp);
        console.log(userData);
      })
      .catch(console.error);
  };
  let DisplayPosts = () => {
    if (userData.posts) {
      userData.posts.map((post) => {
        return (
          <>
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <h3>Price:{post.price}</h3>
              <h3>Delivery:{post.willDeliver}</h3>
            </div>
          </>
        );
      });
    } else {
      return <div>No Posts yet</div>;
    }
  };

  const DisplayMessages = () => {
    if (userData.messages) {
      userData.messages.map((message) => {
        <>
          <div key={message.id}>
            <h2>{message.post.title}</h2>
            <h3>{message.fromUser}</h3>
            <p>{message.content}</p>
          </div>
        </>;
      });
    } else {
      return <div>No messages yet</div>;
    }
  };

  useEffect(() => {
    getUserData();
  }, [token]);

  return token ? (
    <>
      <h1>Your Posts</h1>
      <DisplayPosts />
      <button
        onClick={() => {
          getUserData();
        }}
      >
        See your posts
      </button>
      <h1>Your Messages</h1>
      <DisplayMessages />
      <button
        onClick={() => {
          displayMessages();
        }}
      >
        See your messages
      </button>
    </>
  ) : (
    <span>
      <h1>You are not logged in.</h1>
      <span>
        <Link to="/register">Click here to create an account</Link>
      </span>
      <span>
        <Link to="login">Click here to login</Link>
      </span>
    </span>
  );
};

export default Profile;

// if (userData.posts ) {
//   userData.posts.map((post) => {
//     return (

//         <h1>Messages</h1>
//         <div>No messages</div>;
//     );
//   });
// } else {
//   return <div>You haven't posted anything</div>;
// }
// if (userData.message) {
//   userData.messages.map((message) => {
//     return (
//       <>
//         <h1>Messages you've sent</h1>
//         <div key={message.id}></div>
//       </>
//     );
//   });
// } else {
//   return
// }
// }
