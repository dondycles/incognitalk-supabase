"use client";

import { useState } from "react";

export default function AddPostForm() {
  const [message, setMessage] = useState<string>("");
  const submitPost = async () => {
    await fetch("/api/addPost", {
      method: "POST",
      body: JSON.stringify({ message }),
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <form onSubmit={submitPost} method="post">
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
        placeholder="Message"
        name="message"
      />
      <button className="bg-red-400">SUBMIT</button>
    </form>
  );
}
