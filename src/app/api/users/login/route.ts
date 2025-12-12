import { LoginUserDto } from "@/app/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "./../../../utils/validationSchemas";
import prisma from "@/app/utils/db";
import bcrypt from "bcryptjs";

/**
 * @Route ~/api/users/login
 * @Method POST
 * @Desc Login users to application
 * @Access Public
 */

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as LoginUserDto;
    const validation = LoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }
    const password = await bcrypt.compare(body.password, user.password);
    if (!password) {
      return NextResponse.json(
        { message: "Invalid credentials!" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: `Welcome ${user.username} 😘` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
