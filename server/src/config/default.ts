import "dotenv/config";

const config = {
  port: process.env.PORT!,
  corsOrigin: "*",
  salt: +process.env.SALT!,
  dbUri: process.env.DB_URI!,
};

export default config;
