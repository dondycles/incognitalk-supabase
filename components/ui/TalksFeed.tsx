"use client";
import { PostsTypes } from "@/lib/types/Posts";
import Talk from "./Talk";
import { getPosts } from "@/app/actions/getPosts";
import { useEffect, useState } from "react";
import { TalksState } from "@/lib/store";
import { useDebouce } from "@/lib/hooks/useDebounce";
export default function TalksFeed() {
  const filter = TalksState();
  const [hydrate, setHydrate] = useState(false);
  const [posts, setPosts] = useState<PostsTypes[] | null>([]);

  const fetchPosts = async () => {
    const post = await getPosts({
      message: filter.message as string,
      take: filter.take as number,
    });
    // const post = await fetch("/api/getPosts", { next: { revalidate: 0 } });
    // const postData = await post.json();

    // console.log(postData.map((post: any) => post));
    // if (!postData) return;
    setPosts(post);
  };

  useEffect(() => {
    filter.setTake(4);
  }, [filter.message]);

  useEffect(() => {
    fetchPosts();
  }, [hydrate, useDebouce(filter.message), filter.take, filter.increment]);

  useEffect(() => {
    setHydrate(true);
  }, []);

  // const res = await fetch(
  //   `http://localhost:3000/api/getPosts?message=${
  //     TalksState.getState().message
  //   }&take=${TalksState.getState().take}`,
  //   {
  //     next: { tags: ["posts"] },
  //   }
  // );
  // const posts = await res.json();

  return (
    <div className="grid max-h-full gap-4 overflow-auto rounded-xl grid-cols-fluid scrollbar-thin scrollbar-thumb-primary">
      {posts
        ? posts.map((post: PostsTypes) => {
            return <Talk from="talksfeed" key={post.id} post={post} />;
          })
        : "loading..."}
    </div>
  );
}
