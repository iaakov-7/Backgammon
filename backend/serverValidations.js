export function validateJoinRoom(name,room,socket) {
  if (!name || typeof name !== "string" || name.trim() === "") {
    return { code: "invalid_name", message: "player name illegal" };
  }

  if (!room) {
    return { code: "invalid_roomCode", message: "Room not found" };
  }
  if (room.status !== "waiting") {
    return { code: "invalid_status", message: "Room not waiting" };
  }
  if (room.players.length >= 2) {
    return {
      code: "invalid_players",
      message: "Room has alredy two players",
    };
  }
  const socketId = room.players.find((p) => p.socketId === socket.id);
  if (socketId) {
    return {
      code: "alredy in room",
      message: "Socket id is already in room",
    };
  }
  return null;
}
