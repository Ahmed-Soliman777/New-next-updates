import { NextRequest, NextResponse } from "next/server";
import { CreatePostDTO } from "@/app/utils/types";
import { createPostSchema } from "@/app/utils/validationSchemas";
import { Post } from "@/generated/prisma/client";
import prisma from "@/app/utils/db";
import { POST_PER_PAGE } from "@/app/utils/constants";
import { verifyToken } from "@/app/utils/verifyToken";

/** documentation for api posts
*@method  GET
 @route   http://localhost:3000/api/posts
 @desc    Get all posts by page number
 @access  Public
*/

export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get("page") || "1";
    const posts = await prisma.post.findMany({
      skip: POST_PER_PAGE * (parseInt(page) - 1),
      take: POST_PER_PAGE,
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

/** documentation for api posts
*@method  POST
 @route   http://localhost:3000/api/posts
 @desc    create a post by admin
 @access  Private
*/

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "Invalid Credential" },
        { status: 403 }
      );
    }
    
    const body = (await request.json()) as CreatePostDTO;

    const validation = createPostSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

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
