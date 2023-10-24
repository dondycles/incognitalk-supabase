"use server";

import prisma from "@/prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const deletePost = async ({ id }: { id: string }) => {
  const supabase = createRouteHandlerClient({ cookies });
  const session = await supabase.auth.getSession();

  if (!session.data.session?.user)
    return { error: "You must be logged in to post a message!" };

  try {
    await prisma.posts.delete({ where: { id: id } });
  } catch (error: any) {
    return { error: error.message };
  }

  return { success: "Post Added!" };
};
