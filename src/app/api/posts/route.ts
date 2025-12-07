import { NextRequest, NextResponse } from "next/server";
import { posts } from "@/app/utils/data";
import { CreatePostDTO, Post } from "@/app/utils/types";
import { createPostSchema } from "@/app/utils/validationSchemas";

/** documentation for api posts
*@method  GET
 @route   http://localhost:3000/api/posts
 @desc    Get all posts
 @access  Public
*/

export async function GET() {
  return NextResponse.json(posts, { status: 200 });
}

/** documentation for api posts
*@method  POST
 @route   http://localhost:3000/api/posts
 @desc    create a post
 @access  Public
*/

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CreatePostDTO;

  const validation = createPostSchema.safeParse(body);

  if (!validation.success) {
    // console.log(validation.error.issues[0].message);
    
    return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
  }

  // console.log(body);
  const newPost: Post = {
    title: body.title,
    body: body.body,
    id: posts.length + 1,
    userId: 200,
  };

  posts.push(newPost);

  return NextResponse.json(
    { message: "created", post: newPost },
    { status: 201 }
  );
}
