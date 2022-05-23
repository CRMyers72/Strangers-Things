import { useState } from "react";

const Posts = ({ posts, history, setPosts, setSinglePost }) => {
  const grabPost = (post) => {
    return setSinglePost(post), history.push("/PostDetails");
  };
  return (
    <>
      <h1>Posts</h1>

      {posts.map((post) => {
        return (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <h3>{post.price}</h3>
            <hr></hr>
            <button
              value={post}
              onClick={(e) => {
                grabPost(post);
              }}
            >
              Details
            </button>
          </div>
        );
      })}
      <button onClick={() => history.push("/createposts")}>
        Create a Post
      </button>
    </>
  );
};

export default Posts;

//const post = posts.find((post) => id === post._id)
