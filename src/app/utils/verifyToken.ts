import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { JWTPayload } from "./types";

export function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    const jwtToken = request.cookies.get("token");
    const token = jwtToken?.value as string;

    if (!token) {
      return null;
    }

    const userPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;

    return userPayload;
  } catch (error) {
    return null;
  }
}
