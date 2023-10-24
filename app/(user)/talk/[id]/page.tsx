import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import prisma from "@/prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function Talk({ params }: { params: { id: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  const session = await supabase.auth.getSession();

  const post = await prisma.posts.findUnique({
    where: { id: params.id },
    include: { user: true },
  });
  return (
    <>
      {session.data.session?.user ? (
        <div className="bg-primary/10 rounded-xl p-4 flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <Link
              size="sm"
              color="primary"
              href={"/sneaker/" + post!.userId}
              className="text-xs"
            >
              @{post!.user.userName}
            </Link>
            <Divider orientation="vertical" />
            <p className="text-xs">
              {new Date(post!.createdAt).toLocaleDateString()}
            </p>
          </div>
          <p>{post!.message}</p>
        </div>
      ) : (
        <div>
          <p>No User.</p>
        </div>
      )}
    </>
  );
}
