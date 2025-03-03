import React, { useState } from "react";
import { Axios } from "../service/Axios";

const api = new Axios().getInstance();

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [group, setGroup] = useState(null);
  const [attachments, setAttachments] = useState([]);

  const handlePost = async () => {
    const data = {
      content,
      group,
      attachments,
    };

    try {
      const response = await api.post("/api/posts", data);
      console.log("Post created:", response.data);
      setContent("");
      setAttachments([]);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="lg:max-w-full sm:w-full sm:max-w-[170px] rounded-lg shadow-md border border-gray-300 p-2 w-full text-black">
      <textarea
        className="w-full h-32 p-2 border border-gray-400 rounded-lg resize-none"
        id="text-area"
        rows="4"
        cols="50"
        maxLength="280"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
