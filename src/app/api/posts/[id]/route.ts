import { posts } from "@/app/utils/data";
import { PostDetailsProps, UpdatePostDTO } from "@/app/utils/types";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";

/** documentation for api posts
*@method  GET
 @route   http://localhost:3000/api/posts/:id
 @desc    Get post by id
 @access  Public
*/

export async function GET(request: NextRequest, { params }: PostDetailsProps) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
    if (!post) {
      return NextResponse.json({ message: "No post found!" }, { status: 404 });
    }
    return NextResponse.json({ post }, { status: 200 });
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
*@method  PUT
 @route   http://localhost:3000/api/posts/:id
 @desc    Update post
 @access  Public
*/

export async function DELETE(
  request: NextRequest,
  { params }: PostDetailsProps
) {
  try {
    const { id } = await params;
    //   console.log(id);
    const post = await prisma.post.delete({ where: { id: parseInt(id) } });
    if (!post) {
      return NextResponse.json({ messae: "No post found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: `Post ${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
