import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import config from "./config";
import { connect } from "./utils/connect";
import roomHandler from "./api/handlers/room.handler";
import { routes } from "./api/routes/routes";
import { deserializeUser } from "./api/middlewares/deserializeUser";
import cors from "cors";
import cookieParser from "cookie-parser";

const corsOptions = {
  origin: config.corsOrigin,
  credentials: true,
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: corsOptions });

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(deserializeUser);
app.use(cors(corsOptions));

// socketio
const onConnection = (socket: Socket) => {
  roomHandler(io, socket);
};
io.on("connection", onConnection);

// listen
server.listen(config.port, async () => {
  await connect();
  console.log(`🚀 App running on port ${config.port} 🚀`);
  routes(app);
});
