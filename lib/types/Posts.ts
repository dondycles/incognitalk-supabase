import { Posts, Users } from "@prisma/client";

export interface PostsTypes extends Posts {
  user: Users;
}
