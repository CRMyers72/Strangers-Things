import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { API } from "../App";

const PostDetails = ({ token, history, singlePost }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [error, setError] = useState("");
  const checkDelivery = () => {
    if (singlePost.willDeliver == true) {
      return "Delivery available";
    } else {
      return "Delivery not available";
    }
  };
  const checkIsAuthor = () => {
    if (singlePost.isAuthor == true) {
      return (
        <button
          type="button"
          onClick={() => {
            deletePost(singlePost);
          }}
        />
      );
    }
  };
  const deletePost = async () => {
    const postID = singlePost._id;
    const fetching = await fetch(`${API}/posts/${postID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const info = await fetching.json;
    if (info.success) {
      setError("Post has been deleted");
    } else {
      setError(info.error);
    }
  };
  const displayMessages = () => {
    if (singlePost.isAuthor == true) {
      {
        singlePost.messages.map((message) => {
          return (
            <>
              Messages
              <div key={message._id}>
                <p>{message.post}</p>
                <p>From {message.fromUser}</p>
                <p>Sent at {message.createdAt}</p>
              </div>
            </>
          );
        });
      }
    }
  };

  return (
    <>
      <h1>{singlePost.title}</h1>
      <ul>
        <li>{singlePost.description}</li>
        <li>{singlePost.price}</li>
        <li>Seller: {singlePost.author.username}</li>
        <li>{checkDelivery()}</li>

        <p>{displayMessages()}</p>
      </ul>
      <p>{deletePost}</p>
    </>
  );
};
export default PostDetails;
