import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .min(2, { error: "title must be more than 2 chars" })
    .max(100),
  body: z
    .string({ error: "body is required" })
    .min(2, { error: "body must be more than 2 chars" })
    .max(100),
});
