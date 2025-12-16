import { serialize } from "cookie";
import { JWTPayload } from "./types";
import jwt from "jsonwebtoken";

export function generateToken(jwtPayload: JWTPayload): string {
  const privateKey = process.env.JWT_SECRET as string;

  const token = jwt.sign(jwtPayload, privateKey, {
    expiresIn: "30d",
  });

  return token;
}

export function setCookie(jwtPayload: JWTPayload): string {
  const token = generateToken(jwtPayload);

  // store token at cookie storage
  const cookie = serialize("token", token, {
    httpOnly: true, // to prevent anyone access and edit the token
    secure: process.env.NODE_ENV === "production", // secure == "false" while developing [http] & secure == "true" while deploying [https]
    sameSite: "strict",
    path: "/", // all pages get that cookie
    maxAge: 60 * 60 * 24 * 30, // expires after 30 days
  });

  return cookie;
}
