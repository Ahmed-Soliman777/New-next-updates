import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";

/** documentation for api posts
*@method  GET
 @route   http://localhost:3000/api/posts/search?searchText=value
 @desc    Get post by search
 @access  Public
*/

export async function GET(request: NextRequest) {
  try {
    const searchText = request.nextUrl.searchParams.get("searchText");
    let post;
    if (searchText) {
      post = await prisma.post.findMany({
        where: {
          title: {
            contains: searchText,
            mode: "insensitive",
          },
        },
      });
      if (post.length === 0) {
        return NextResponse.json(
          { message: "No post found!" },
          { status: 404 }
        );
      }
    } else {
      post = await prisma.post.findMany({ take: 6 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
