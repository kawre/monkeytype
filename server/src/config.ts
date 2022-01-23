import "dotenv/config";
import cfg from "config";
import cfg2 from "../config/default";

type Cfg = typeof cfg2;

const config: Cfg = {
  port: cfg.get("port"),
  corsOrigin: cfg.get("corsOrigin"),
  countdownDuration: cfg.get("countdownDuration"),
  salt: cfg.get("salt"),
  dbUri: cfg.get("dbUri"),
  accessTokenPublicKey: cfg.get("accessTokenPublicKey"),
  accessTokenPrivateKey: cfg.get("accessTokenPrivateKey"),
  refreshTokenPublicKey: cfg.get("refreshTokenPublicKey"),
  refreshTokenPrivateKey: cfg.get("refreshTokenPrivateKey"),
  accessTokenTtl: cfg.get("accessTokenTtl"),
  refreshTokenTtl: cfg.get("refreshTokenTtl"),
};

export default config;
