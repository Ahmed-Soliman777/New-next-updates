import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string("Must be a string").min(2,"Must be more than 2 chars").max(100),
  body: z.string("Must be a string").min(2,"Must be more than 2 chars").max(100),
});
