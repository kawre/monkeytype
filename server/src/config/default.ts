import "dotenv/config";

const config = {
  port: process.env.PORT!,
  corsOrigin: "*",
  dbUri: process.env.DB_URI!,
};

export default config;
