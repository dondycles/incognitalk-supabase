"use client";
import { PostsTypes } from "@/lib/types/Posts";
import Talk from "./Talk";
import { getPosts } from "@/app/actions/getPosts";
import { useEffect, useState } from "react";
import { TalksState } from "@/lib/store";
import { useDebouce } from "@/lib/hooks/useDebounce";

export const revalidate = 0;

export default function TalksFeed({}: {}) {
  const filter = TalksState();
  const [hydrate, setHydrate] = useState(false);
  const [posts, setPosts] = useState<PostsTypes[] | null>([]);

  const fetchPosts = async () => {
    const post = await getPosts({
      message: filter.message as string,
      take: filter.take as number,
    });

    if (null) return;

    setPosts(post);
  };

  useEffect(() => {
    fetchPosts();
  }, [hydrate, useDebouce(filter.message), filter.take]);

  useEffect(() => {
    setHydrate(true);
  }, []);

  return (
    <div className="grid max-h-full gap-4 overflow-auto rounded-xl grid-cols-fluid scrollbar-thin scrollbar-thumb-primary">
      {posts
        ? posts.map((post: PostsTypes) => {
            return <Talk key={post.id} post={post} />;
          })
        : "loading..."}
    </div>
  );
}
