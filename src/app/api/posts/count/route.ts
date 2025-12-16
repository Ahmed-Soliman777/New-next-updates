import { NextResponse } from "next/server";
import prisma from "@/app/utils/db";

/** documentation for api posts
*@method  GET
 @route   http://localhost:3000/api/posts/count
 @desc    Get post count
 @access  Public
*/

export async function GET() {
  try {
    const postcount = await prisma.post.count();
    return NextResponse.json({ count: postcount }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
