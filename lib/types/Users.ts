import { Posts, Users } from "@prisma/client";

export interface UserTypes extends Users {
  posts: Posts[];
}
