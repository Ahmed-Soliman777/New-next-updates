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

export const RegisterSchema = z.object({
  username: z.string().min(2).max(35),
  email: z.email().min(2).max(100),
  password: z.string().min(2).max(35),
});

export const LoginSchema = z.object({
  email: z.email().min(2).max(100),
  password: z.string().min(2).max(35),
});

export const CommentSchema = z.object({
  text: z
    .string({ error: "Comment text must be string" })
    .max(250, { error: "Comment must not exceed 250 characters!" })
    .min(1, { error: "Empty comment!" }),
  postId: z
    .number({ error: "Invalid post id" })
    .min(1, { error: "You have to insert a valid post id number" }),
});

export const UpdateUserProfileSchema = z.object({
  username: z.string().min(2).max(35).optional(),
  email: z.email().min(2).max(100).optional(),
  password: z.string().min(2).max(35).optional(),
});
