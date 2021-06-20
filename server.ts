import express, { NextFunction } from "express";
import router from "./src/routes/route";
import cors from "cors";
import "dotenv/config";
import dbConnect from "./src/db/connect";
import jwt from "jsonwebtoken";
import Room from "./src/model/Room";
import { IRoom } from "./src/model/Room";

const app: express.Application = express(),
  PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use("/", router);
app.use(() => dbConnect);

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

const onlineUsers: Array<any> = [];

io.of("/chat")
  .use((socket: any, next: NextFunction) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(
        socket.handshake.query.token,
        "SECRET",
        function (err: any, decoded: any) {
          if (err) return next(new Error("Authentication error"));
          socket.decoded = decoded;
          next();
        }
      );
    } else {
      next(new Error("not authorized"));
    }
  })
  .on("connection", (socket: any) => {
    socket.username = socket.decoded.name;
    onlineUsers[socket.username] = socket.id;
    console.log(onlineUsers);

    // When a user is typing
    socket.on("typing", () => {
      io.of("/chat").emit("typing", socket.username);
    });
    // Public Chat
    socket.on("message", (msg: string) => {
      io.of("/chat").emit("message", { pseudo: socket.username, msg });
    });
    // Private Direct Message
    socket.on("private", (data: any) => {
      io.of("/chat")
        .to(onlineUsers[data.to])
        .to(onlineUsers[socket.username])
        .emit("private", { sender: socket.username, msg: data.msg });
    });

    // Join Room
    socket.on("join_room", async (roomId: string) => {
      Room.findOne(
        { _id: roomId, users: socket.decoded._id },
        (err: any, data: IRoom) => {
          console.log(data);
          if (err) console.log(err);
          else {
            console.log(socket.username + " join the room with id " + roomId);
            socket.join(roomId);
            console.log(socket.rooms);
            // console.log(io.sockets.adapter.room)
            // TODO trouver un moyen de renvoyer tout les clients connectés dans la room
            // io.of('/chat').to(roomId).emit('updateUsers', socket.username)
          }
        }
      );
    });
    socket.on("leave_room", (roomId: string) => {
      socket.leave(roomId);
      console.log(socket.username + " leave the room with id " + roomId);
    });
    // Send Message to the Room
    socket.on("message_room", (data: { roomId: string; msg: string }) => {
      io.of("/chat")
        .to(data.roomId)
        .emit("message", { pseudo: socket.username, msg: data.msg });
    });

    socket.on("disconnect", () => {
      delete onlineUsers[socket.username];
      console.log(onlineUsers);
    });
  });

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
