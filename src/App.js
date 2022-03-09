import React, { useState, useEffect } from "react";

import { Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Home, Navbar, Posts, Register, Profile } from "./Components";

export const API =
  "https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT/";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  async function fetchPosts() {
    const response = await fetch(`${API}/posts`);
    const info = await response.json();
    setPosts(info.data.posts);
  }

  const fetchUser = async () => {
    const lsToken = localStorage.getItem("token");
    if (lsToken) {
      setToken(lsToken);
    }
    const resp = await fetch(`${API}/users/me`, {
      headers: {
        Authorization: `Bearer ${lsToken}`,
      },
    });
    const info = await resp.json;
    if (info.success) {
      setUser(info.data);
    }
  };

  useEffect(() => {
    console.log("useEffect fired");
    fetchUser();
    fetchPosts();
  }, [token]);

  return (
    <div id="container">
      <div id="navbar">
        <Navbar user={user} setToken={setToken} setUser={setUser} />
      </div>

      <div id="main-section">
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/posts">
          <Posts posts={posts} token={token} />
        </Route>
        <Route path="/profile">
          <Profile setToken={setToken} />
        </Route>
      </div>
    </div>
  );
};

export default App;
