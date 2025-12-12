import prisma from "@/app/utils/db";
import { RegisterUserDto } from "@/app/utils/types";
import { RegisterSchema } from "@/app/utils/validationSchemas";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

/**
 * @Route POST ~/api/users/register
 * @Summary Register a new user
 * @Tags Users
 * @Accept json
 * @Produce json
 * @Success 200 {object} { message: string }
 * @Failure 400 {object} { error: string }
 * @Router /api/users/register [post]
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;
    const validation = RegisterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
      return NextResponse.json(
        { message: "this email already exists!!!🙄" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        isAdmin: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    NextResponse.json({ message: error }, { status: 500 });
  }
}
