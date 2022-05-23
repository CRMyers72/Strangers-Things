import React from "react";
import { useState } from "react";
import { API } from "../App";

const CreatePosts = ({ token, history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [error, setError] = useState("");

  const handlePost = async (e) => {
    e.preventDefault();

    const resp = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          delivery,
        },
      }),
    });
    const info = await resp.json();
    if (info.success == false) {
      return setError(info.error.message);
    }
    return setError("Post Created"), history.push("/posts");
  };

  return (
    <span>
      <h1>Create a Post</h1>
      <form onSubmit={handlePost}>
        <input
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          required
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          required
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <input
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select value={delivery} onChange={(e) => setDelivery(e.target.value)}>
          <option value="true">Delivery Available</option>
          <option value="false">Delivery NOT Available</option>
        </select>
        <button type="submit">Create Listing</button>
      </form>
      <p>{error}</p>
    </span>
  );
};

export default CreatePosts;
