"use client";
import { getUser } from "@/app/actions/getUser";
import LoadMoreTalks from "@/components/ui/LoadMoreTalks";
import Talk from "@/components/ui/Talk";
import { UserTypes } from "@/lib/types/Users";
import { Divider } from "@nextui-org/divider";
import { useEffect, useState } from "react";

export default function User({ params }: { params: { id: string } }) {
  const [hydrate, setHydrate] = useState(false);
  const [user, setUser] = useState<UserTypes>();
  const [take, setTake] = useState(4);
  const fetchUser = async () => {
    const user = await getUser({ id: params.id, take: take });
    if (!user) return;
    setUser(user);
  };

  useEffect(() => {
    if (!hydrate) return;
    fetchUser();
  }, [hydrate, take]);

  useEffect(() => {
    setHydrate(true);
  }, []);

  return (
    <>
      {user ? (
        <div className="flex flex-col gap-4 max-h-full h-screen overflow-auto">
          <div className="flex gap-4 flex-wrap text-xs">
            <p>@{user?.userName}</p>
            <Divider orientation="vertical" />
            <p>created at {new Date(user!.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="grid max-h-full gap-4 overflow-auto rounded-xl grid-cols-fluid scrollbar-thin scrollbar-thumb-primary">
            {user?.posts.map((post: any) => {
              return <Talk from="profile" key={post.id} post={post} />;
            })}
          </div>
          <LoadMoreTalks
            onClick={() => setTake((prev) => prev + 4)}
            from="profile"
          />
        </div>
      ) : (
        <div>
          <p>No User.</p>
        </div>
      )}
    </>
  );
}
