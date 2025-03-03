import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../service/Axios";
import { AiTwotoneLike } from "react-icons/ai";
import CreatePost from "./CreatePost";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

interface User {
  id: number;
  username: string;
}

interface Post {
  id: number;
  owner: User | number;
  content: string;
  createdAt: string;
  likes?: (number | User)[];
  parent?: number;
  group?: number;
  attachments?: {
    id: number;
    owner: number;
    type: string;
    image?: string;
    post?: number;
  }[];
}

interface PostsResponse {
  content: Post[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
}

const api = new Axios().getInstance();

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const fetchPosts = async () => {
        try {
          const response = await api.get<PostsResponse>("/api/posts/trending");
          setPosts(response.data.content);
          console.log(response.data);
        } catch (err) {
          setError("Failed to fetch posts");
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold items-center">Miniature</h1>
      <div className="mt-10 mb-10">
        <CreatePost />
      </div>
      <h1 className="text-2xl font-bold mb-4">Trending Posts</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <span className="font-semibold">
                {typeof post.owner === "object"
                  ? post.owner.username
                  : `User   ${post.owner}`}
              </span>
              <span className="text-gray-500 text-sm ml-2">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="mb-2">{post.content}</p>
            {post.attachments && post.attachments.length > 0 && (
              <div className="mt-2">
                {post.attachments.map((attachment) => (
                  <div key={attachment.id} className="mb-2">
                    {attachment.type === "image" && attachment.image && (
                      <img
                        src={attachment.image}
                        alt="Attachment"
                        className="max-w-full h-auto rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="text-gray-500">
              {post.likes && post.likes.length > 0 && (
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <AiTwotoneLike className="mr-1" />
                    {post.likes.length}{" "}
                    {post.likes.length > 1 ? "likes" : "like"}
                  </span>
                  <FaComment className="mx-2" />
                  <FaShare />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
