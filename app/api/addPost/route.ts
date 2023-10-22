import prisma from "@/prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiResponse } from "next";
import { cookies } from "next/headers";

// export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // const supabase = createRouteHandlerClient({ cookies });
  // const session = await supabase.auth.getSession();

  // if (!session) {
  //   return new Response("No Session", { status: 500 });
  // }

  // if (!message) {
  //   return new Response("No Message", { status: 500 });
  // }

  try {
    const data = await request.json();
    const message = data.message;
    await prisma.posts.create({
      data: {
        message: message,
      },
    });
    return new Response("Post Added", { status: 200 });
  } catch (error: any) {
    return new Response("Error", { status: 500 });
  }
}
