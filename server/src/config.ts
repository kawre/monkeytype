import "dotenv/config";
import cfg from "config";

interface Config {
  port: number;
  dbUri: string;
  salt: number;
  corsOrigin: string;
  accessTokenTtl: string;
  refreshTokenTtl: string;
  accessTokenPublicKey: string;
  accessTokenPrivateKey: string;
  refreshTokenPublicKey: string;
  refreshTokenPrivateKey: string;
}

const config: Config = {
  port: cfg.get("port"),
  corsOrigin: cfg.get("corsOrigin"),
  salt: cfg.get("saltWorkFactor"),
  dbUri: cfg.get("dbUri"),
  accessTokenPublicKey: cfg.get("accessTokenPublicKey"),
  accessTokenPrivateKey: cfg.get("accessTokenPrivateKey"),
  refreshTokenPublicKey: cfg.get("refreshTokenPublicKey"),
  refreshTokenPrivateKey: cfg.get("refreshTokenPrivateKey"),
  accessTokenTtl: cfg.get("accessTokenTtl"),
  refreshTokenTtl: cfg.get("refreshTokenTtl"),
};

export default config;
