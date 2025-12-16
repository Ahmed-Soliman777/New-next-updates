import prisma from "@/app/utils/db";
import { commentPropsType, UpdateCommentDTO } from "@/app/utils/types";
import { verifyToken } from "@/app/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method PUT
 * @access Private
 * @Desc Update commnet
 * @Path ~/comments/:id
 */

export async function PUT(request: NextRequest, props: commentPropsType) {
  try {
    const { id } = await props.params;

    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "comment not found!" },
        { status: 404 }
      );
    }

    const user = verifyToken(request);

    if (user === null || user.id !== comment?.userId) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 403 }
      );
    }

    const body = (await request.json()) as UpdateCommentDTO;
    const updateComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: {
        text: body.text,
      },
    });

    return NextResponse.json(updateComment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

/**
 * @method DELETE
 * @access Private
 * @Desc Delete commnet
 * @Path ~/comments/:id
 */

export async function DELETE(request: NextRequest, props: commentPropsType) {
  try {
    const { id } = await props.params;

    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "comment not found!" },
        { status: 404 }
      );
    }

    const user = verifyToken(request);

    if (user === null || user.id !== comment?.userId) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 403 }
      );
    }

    await prisma.comment.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: `comment with id ${id} has been deleted!` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
