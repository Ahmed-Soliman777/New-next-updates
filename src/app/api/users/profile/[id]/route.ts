import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { ProfileIdProps, UpdateProfileDTO } from "@/app/utils/types";
import { verifyToken } from "@/app/utils/verifyToken";
import bcrypt from "bcryptjs";
import { UpdateUserProfileSchema } from "@/app/utils/validationSchemas";

/**
 * @Method DELETE
 * @access private
 * @desc Delete user profile
 */

export const DELETE = async (request: NextRequest, props: ProfileIdProps) => {
  try {
    // get user id from params
    const { id } = await props.params;

    // get user from database
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { comments: true },
    });

    // check if user not found at database
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    const userPayload = verifyToken(request);

    // validate if user's id matches with user's token from user payload
    if (userPayload !== null && userPayload.id === user?.id) {
      await prisma.user.delete({ where: { id: parseInt(id) } });

      const commentIds: number[] = user?.comments.map((comment) => comment.id);
      await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });

      return NextResponse.json(
        { message: `Your account with id: ${id} has been deleted` },
        { status: 200 }
      );
    }

    // return forbidden message if user's token doesn't match with user's profile user [not the same user]
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

/**
 * @Method GET
 * @access private
 * @desc Get user profile
 */

export async function GET(request: NextRequest, props: ProfileIdProps) {
  try {
    const { id } = await props.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createAt: true,
      },
    });
    if (!user) {
      return NextResponse.json(
        { Message: "user not found !" },
        { status: 404 }
      );
    }
    const userPayload = verifyToken(request);
    if (userPayload !== null && userPayload.id == user.id) {
      return NextResponse.json(
        {
          message: `Welcome ${user.username}`,
          ...user,
        },
        {
          status: 200,
        }
      );
    }
    return NextResponse.json(
      { message: "Invalid Credentials" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

/**
 * @Method PUT
 * @access private
 * @desc Update user profile
 */

export async function PUT(request: NextRequest, props: ProfileIdProps) {
  try {
    const { id } = await props.params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
      return NextResponse.json({ Message: "user not found!" }, { status: 404 });
    }

    const userPayload = verifyToken(request);
    if (userPayload === null || userPayload.id !== user.id) {
      return NextResponse.json(
        { message: "Invalid credentials!" },
        { status: 403 }
      );
    }

    const body = (await request.json()) as UpdateProfileDTO;
    const validation = UpdateUserProfileSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.issues[0].message, {
        status: 400,
      });
    }
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password as string, salt);
    }

    const updateUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
        isAdmin: body.isAdmin,
      },
      select: {
        username: true,
        email: true,
        isAdmin: true,
      },
    });

    return NextResponse.json({ updateUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
