"use server";
import prisma from "@/prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const getUser = async ({ id, take }: { id: string; take: number }) => {
  const supabase = createRouteHandlerClient({ cookies });
  const session = await supabase.auth.getSession();

  if (!session.data.session?.user) return null;
  try {
    const user = await prisma.users.findUnique({
      where: { userId: id },
      include: { posts: { take: take } },
    });
    return user;
  } catch (error) {
    return null;
  }
};
