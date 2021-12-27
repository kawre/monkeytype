import { sign, SignOptions, verify } from "jsonwebtoken";
import { get } from "lodash";
import config from "../config";

export const signJwt = (
  payload: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: SignOptions
) => {
  // const signingKey = Buffer.from(get(config, keyName), "base64").toString(
  //   "ascii"
  // );
  const signingKey = get(config, keyName);

  return sign(payload, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = (
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) => {
  // const publicKey = Buffer.from(get(config, keyName), "base64").toString(
  //   "ascii"
  // );
  const publicKey = get(config, keyName);

  try {
    const decoded = verify(token, publicKey);

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
