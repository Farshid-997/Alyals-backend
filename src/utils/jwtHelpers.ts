import httpStatus from "http-status";
import jwt, { JwtPayload, Secret, verify } from "jsonwebtoken";

import ApiError from "../errors/ApiError";

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  try {
    const isVerified = verify(token, secret);
    return isVerified as any;
  } catch (error) {
    return new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
  }
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
