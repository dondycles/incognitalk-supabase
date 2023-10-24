"use server";
import { PostsTypes } from "@/lib/types/Posts";
import prisma from "@/prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const getPosts = async ({
  message,
  take,
}: {
  message: string;
  take: number;
}) => {
  const supabase = createRouteHandlerClient({ cookies });
  const session = await supabase.auth.getSession();

  if (!session.data.session?.user) return null;

  try {
    const posts = await prisma.posts.findMany({
      include: { user: true },
      where: { message: { contains: message, mode: "insensitive" } },
      orderBy: { createdAt: "asc" },
      take: take,
    });
    return posts;
  } catch (error) {
    return null;
  }
};
