import "dotenv/config";
import cfg from "config";

interface Config {
  port: number;
  dbUri: string;
  salt: number;
  corsOrigin: string;
  privateKey: string;
  publicKey: string;
  accessTokenTtl: string;
  refreshTokenTtl: string;
}

const config: Config = {
  port: cfg.get("port"),
  corsOrigin: cfg.get("corsOrigin"),
  salt: cfg.get("saltWorkFactor"),
  dbUri: cfg.get("dbUri"),
  privateKey: cfg.get("privateKey"),
  publicKey: cfg.get("publicKey"),
  accessTokenTtl: cfg.get("accessTokenTtl"),
  refreshTokenTtl: cfg.get("accessTokenTtl"),
};

export default config;
