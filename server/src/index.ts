import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import config from "./config/default";
import { connect } from "./utils/connect";
import roomHandler from "./api/handlers/room.handler";
import { routes } from "./api/routes/routes";

const app = express();
const server = http.createServer(app);

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const onConnection = (socket: Socket) => {
  roomHandler(io, socket);
};

io.on("connection", onConnection);

server.listen(config.port, async () => {
  await connect();
  console.log(`🚀 App running on port ${config.port} 🚀`);
  routes(app);
});
