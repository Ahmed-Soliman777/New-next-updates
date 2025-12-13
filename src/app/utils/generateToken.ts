import { JWTPayload } from "./types";
import jwt from "jsonwebtoken";

export function generateToken(jwtPayload: JWTPayload): string {

  const privateKey = process.env.JWT_SECRET as string;

  const token = jwt.sign(jwtPayload, privateKey, {
    expiresIn: "30d",
  });
  
  return token;
}
