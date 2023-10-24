"use server";
import { PostsTypes } from "@/lib/types/Posts";
import prisma from "@/prisma/client";

export const getPosts = async ({
  message,
  take,
}: {
  message: string;
  take: number;
}) => {
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
