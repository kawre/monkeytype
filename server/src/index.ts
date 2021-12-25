import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import config from "./config";
import { connect } from "./utils/connect";
import roomHandler from "./api/handlers/room.handler";
import { routes } from "./api/routes/routes";
import { deserializeUser } from "./api/middlewares/deserializeUser";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// middleware
app.use(express.json());
app.use(deserializeUser);

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
