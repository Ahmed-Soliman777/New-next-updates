import { PostDetailsProps, UpdatePostDTO } from "@/app/utils/types";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { verifyToken } from "@/app/utils/verifyToken";

/** documentation for api posts
*@method  GET
 @route   http://localhost:3000/api/posts/:id
 @desc    Get post by id
 @access  Public
*/

export async function GET(request: NextRequest, { params }: PostDetailsProps) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        comment: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc", // from newest first to oldest
          },
        },
      },
    });
    if (!post) {
      return NextResponse.json({ message: "No post found!" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

/** documentation for api posts
*@method  PUT
 @route   http://localhost:3000/api/posts/:id
 @desc    Update post
 @access  Public
*/

export async function PUT(request: NextRequest, { params }: PostDetailsProps) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 403 }
      );
    }
    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
    if (!post) {
      return NextResponse.json(
        { message: "No post found - invalid id !🤔! " },
        { status: 404 }
      );
    }
    const body = (await await request.json()) as UpdatePostDTO;
    //   console.log(id);
    if (!post) {
      return NextResponse.json({ messae: "No post found" }, { status: 404 });
    }
    const updatePost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        body: body.body,
      },
    });
    return NextResponse.json({ updatePost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

/** documentation for api posts
*@method  DELETE
 @route   http://localhost:3000/api/posts/:id
 @desc    DELETE post by admin
 @access  Private
*/

export async function DELETE(request: NextRequest, props: PostDetailsProps) {
  try {
    const { id } = await props.params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        comment: true,
      },
    });
    if (!post) {
      return NextResponse.json({ messae: "No post found" }, { status: 404 });
    }

    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 403 }
      );
    }

    await prisma.post.delete({ where: { id: parseInt(id) } });

    const commentIds: number[] = post?.comment.map((comment) => comment.id);
    await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });

    return NextResponse.json(
      { message: `Post ${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
