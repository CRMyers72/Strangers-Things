import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, setToken, setUser }) => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/Posts">Posts</Link>
      <Link to="/Register">Profile</Link>
      <Link
        to="/"
        onClick={() => {
          setToken("");
          setUser(null);
          localStorage.removeItem("token");
        }}
      >
        Log Out
      </Link>
      {user ? <span>Welcome {user.username}</span> : null}
    </>
  );
};
export default Navbar;
