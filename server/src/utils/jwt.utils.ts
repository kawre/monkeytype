import { sign, SignOptions, verify } from "jsonwebtoken";
import config from "../config";

export const signJwt = (payload: Object, options?: SignOptions) => {
  return sign(payload, config.privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = verify(token, config.publicKey);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};
