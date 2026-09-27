import http from "http";
import { Server } from "socket.io";
import { createRoom } from "./service.js";
import { gameState } from "./gameEngin/game.js";
import { validateJoinRoom, validateStartGame } from "./serverValidations.js";

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = [];

function handlePlyerLeave(socket, reason) {
  const room = rooms.find((r) =>
    r.players.some((p) => p.socketId === socket.id),
  );
  if (!room) {
    console.log("not found");
    return;
  }
  const otherPlayer = room.players.find((p) => p.socketId !== socket.id);
  if (otherPlayer) {
    io.to(otherPlayer.socketId).emit("room:closed", {
      reason: reason,
    });
  }
  io.in(room.id).socketsLeave(room.id);
  const roomIndex = rooms.findIndex((r) => r.id === room.id);
  rooms.splice(roomIndex, 1);
}

io.on("connection", (socket) => {
  socket.on("room:create", ({ name }, callback) => {
    if (!name || typeof name !== "string" || name.trim() === "") {
      return callback({
        success: false,
        error: { code: "invalid_name", message: "player name illegal" },
      });
    }
    const room = createRoom(rooms, socket, name.trim());
    rooms.push(room);

    socket.join(room.id);
    const publikRoom = {
      id: room.id,
      status: room.status,
      players: room.players.map((p) => ({ name: p.name, color: p.color })),
    };
    return callback({
      success: true,
      room: publikRoom,
      yourColor: "white",
    });
  });

  socket.on("room:join", ({ roomCode, name }, callback) => {
    const room = rooms.find((r) => r.id === roomCode);
    const validationError = validateJoinRoom(name, room, socket);
    if (validationError) {
      return callback({
        success: false,
        error: validationError,
      });
    }
    room.players.push({
      socketId: socket.id,
      name: name.trim(),
      color: "black",
    });
    room.game = gameState;
    socket.join(room.id);
    const publikRoom = {
      id: room.id,
      status: room.status,
      players: room.players.map((p) => ({ name: p.name, color: p.color })),
      game: room.game,
    };
    callback({
      success: true,
      room: publikRoom,
      yourColor: "black",
    });
    io.to(room.id).emit("room:state", { room: publikRoom });
  });
  socket.on("game:start", (callback) => {
    const room = rooms.find((r) =>
      r.players.some((p) => p.socketId === socket.id),
    );
    const validationError = validateStartGame(room, socket);
    if (validationError) {
      return callback({
        success: false,
        error: validationError,
      });
    }
    room.status = "playing";
    callback({
      success: true,
    });
    const publikRoom = {
      status: room.status,
      players: room.players.map((p) => ({ name: p.name, color: p.color })),
      game: room.game,
    };
    io.to(room.id).emit("room:state", { room: publikRoom });
  });
  socket.on("room:leave", (callback) => {
    handlePlyerLeave(socket, "player_left");
    callback({
      success: true,
    });
  });
  socket.on("disconnect", () => {
    handlePlyerLeave(socket, "player_disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
