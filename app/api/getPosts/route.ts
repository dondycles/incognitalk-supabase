import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("hi");

  try {
    const data = await prisma.posts.findMany();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
