"use server";

import prisma from "@/prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
export const addPost = async (data: FieldValues) => {
  const supabase = createRouteHandlerClient({ cookies });
  const session = await supabase.auth.getSession();
  const message = data.message;

  if (!session.data.session?.user)
    return { error: "You must be logged in to post a message!" };

  try {
    await prisma.posts.create({
      data: {
        message: message as string,
        userId: session.data.session.user.id,
      },
    });
  } catch (error: any) {
    return { error: error.message };
  }

  return { success: "Post Added!" };
};
