import { NextRequest, NextResponse } from "next/server";
import { CreatePostDTO } from "@/app/utils/types";
import { createPostSchema } from "@/app/utils/validationSchemas";
import { Post } from "@/generated/prisma/client";
import prisma from "@/app/utils/db";

/** documentation for api posts
*@method  GET
 @route   http://localhost:3000/api/posts
 @desc    Get all posts
 @access  Public
*/

export async function GET() {
  try {
    // return NextResponse.json(posts, { status: 200 });
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

/** documentation for api posts
*@method  POST
 @route   http://localhost:3000/api/posts
 @desc    create a post
 @access  Public
*/

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreatePostDTO;

    const validation = createPostSchema.safeParse(body);

    if (!validation.success) {
      // console.log(validation.error.issues[0].message);

      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    // console.log(body);
    const newPost: Post = await prisma.post.create({
      data: {
        title: body.title,
        body: body.body,
      },
    });

    return NextResponse.json(
      { message: "created", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
