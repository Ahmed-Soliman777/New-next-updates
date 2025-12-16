import prisma from "@/app/utils/db";
import { CreateCommentDTO } from "@/app/utils/types";
import { CommentSchema } from "@/app/utils/validationSchemas";
import { verifyToken } from "@/app/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @access Private
 * @Desc Create new commnet
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "Please create an account or login" },
        { status: 401 }
      );
    }

    const body = (await request.json()) as CreateCommentDTO;

    const post = await prisma.post.findUnique({ where: { id: body.postId } });

    if (!post) {
      return NextResponse.json({ message: "no post found!" }, { status: 404 });
    }

    const validation = await CommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        userId: user.id,
        text: body.text,
        postId: body.postId,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

/**
 * @method GET
 * @access Private (ONLY ADMIN ACCESS)
 * @Desc Get all commnets
 */

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || user.isAdmin === false) {
      return NextResponse.json({ message: "invalid access" }, { status: 403 });
    }

    const comments = await prisma.comment.findMany();

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
