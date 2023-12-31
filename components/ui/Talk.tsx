"use client";
import { PostsTypes } from "@/lib/types/Posts";
import { Button, Divider, Link } from "@nextui-org/react";
import { useUserState } from "@/lib/store";
import { FaPen, FaTrash } from "react-icons/fa";
import UserTalkActions from "./UserTalkActions";

export default function Talk({
  post,
  from,
}: {
  post: PostsTypes;
  from: "profile" | "talksfeed";
}) {
  const user = useUserState();

  return (
    <div
      key={post.id}
      className={`bg-gradient-to-t from-primary/5 to-primary/20 p-4 rounded-xl flex flex-col gap-4 text-sm ${
        from ? "h-auto" : "h-[174px] "
      }`}
    >
      <div className="flex flex-row gap-4">
        <Link
          size="sm"
          color="primary"
          href={"/sneaker/" + post.userId}
          className="text-xs"
        >
          {user.id.match(post.userId) ? "me" : `@${post.user.userName}`}
        </Link>
        <Divider orientation="vertical" />
        <p className="text-xs">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex-1 overflow-hidden">
        <p>{post.message}</p>
      </div>
      {from === "profile" && (
        <UserTalkActions id={post.id} message={post.message} />
      )}

      {from === "talksfeed" && (
        <>
          <Divider className="mt-auto mb-0" />
          <div className="flex items-end justify-center w-full mt-auto mb-0 ">
            <Link
              size="sm"
              color="primary"
              href={"/talk/" + post.id}
              className="text-xs"
            >
              Read More
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
