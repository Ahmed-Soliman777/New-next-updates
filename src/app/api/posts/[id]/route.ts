import { posts } from "@/app/utils/data";
import { PostDetailsProps, UpdatePostDTO } from "@/app/utils/types";
import { NextRequest, NextResponse } from "next/server";

/** documentation for api posts
*@method  GET
 @route   http://localhost:3000/api/posts/:id
 @desc    Get post by id
 @access  Public
*/

export async function GET(request: NextRequest, { params }: PostDetailsProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  //   console.log(id);
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post) {
    return NextResponse.json({ messae: "No post found" }, { status: 404 });
  }
  return NextResponse.json(post, { status: 200 });
}

/** documentation for api posts
*@method  PUT
 @route   http://localhost:3000/api/posts/:id
 @desc    Update post
 @access  Public
*/

export async function PUT(request: NextRequest, { params }: PostDetailsProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const body = (await await request.json()) as UpdatePostDTO;
  //   console.log(id);
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post) {
    return NextResponse.json({ messae: "No post found" }, { status: 404 });
  }
  console.log(body);
  return NextResponse.json({message: "Post update successfully"}, { status: 200 });
}


/** documentation for api posts
*@method  PUT
 @route   http://localhost:3000/api/posts/:id
 @desc    Update post
 @access  Public
*/

export async function DELETE(request: NextRequest, { params }: PostDetailsProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  //   console.log(id);
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post) {
    return NextResponse.json({ messae: "No post found" }, { status: 404 });
  }

  return NextResponse.json({message: "Post deleted successfully"}, { status: 200 });
}