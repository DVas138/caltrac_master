import { ExtractJwt } from "passport-jwt";
import { Request } from "express";
import jwt from "jsonwebtoken";
interface payload extends jwt.JwtPayload {
  id: string;
}
export default function getToken(req: Request): payload {
  const tokenExtract = ExtractJwt.fromAuthHeaderAsBearerToken();
  const token = tokenExtract(req) as string;
  return jwt.decode(token) as payload;
}
