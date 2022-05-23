import React, { useState, useEffect } from "react";

import { Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Home,
  Navbar,
  Posts,
  Register,
  Profile,
  Login,
  CreatePosts,
  PostDetails,
} from "./Components";

export const API =
  "https://strangers-things.herokuapp.com/api/2202-FTB-ET-WEB-PT/";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [singlePost, setSinglePost] = useState({});

  let history = useHistory();

  const makeHeaders = (token) => {
    token
      ? {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      : [null];
  };

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
        "Authorization": `Bearer ${lsToken}`,
      },
    });
    const info = await resp.json;
    if (info.success) {
      setUser(info.data);
    }
  };

  useEffect(() => {
    // console.log("useEffect fired");
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
          <Posts
            posts={posts}
            token={token}
            history={history}
            setPosts={setPosts}
            setSinglePost={setSinglePost}
          />
        </Route>
        <Route path="/profile">
          <Profile setToken={setToken} token={token} history={history} />
        </Route>
        <Route path="/register">
          <Register
            setToken={setToken}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            history={history}
          />
        </Route>
        <Route path="/login">
          <Login
            token={token}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            setToken={setToken}
          />
        </Route>
        <Route path="/createPosts">
          <CreatePosts token={token} history={history} />
        </Route>
        <Route path="/postdetails">
          <PostDetails
            token={token}
            history={history}
            singlePost={singlePost}
          />
        </Route>
      </div>
    </div>
  );
};

export default App;
