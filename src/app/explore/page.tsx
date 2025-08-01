"use client";

import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/actions/post.action";
import { searchPosts } from "@/actions/explore.action";
import { useState, useEffect } from "react";
import { Post } from "@prisma/client";

export default function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    };
    fetchPosts();
  }, []);

  const handleSearch = async () => {
    const searchResults = await searchPosts(searchQuery);
    setPosts(searchResults);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="px-4 py-2 bg-white dark:bg-black rounded-lg">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
