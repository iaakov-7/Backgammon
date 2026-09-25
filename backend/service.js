import { Socket } from "socket.io";

export function createRoom(rooms, /** @type {Socket} */ socket, name) {
  const room = {
    id: createCodeForRoom(rooms),
    status: "waiting", // waiting | playing | finished
    ownerSocketId: socket.id,
    players: [{ socketId: socket.id, name: name, color: "white" }],
    game: null,
    rematchAcceptedBy: [],
  };
  return room;
}

function createCodeForRoom(rooms) {
  const chrs = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = Array(6)
    .fill(null)
    .map((c) => (c = chrs[Math.floor(Math.random() * chrs.length)]))
    .join("");
  const hasAlredy = rooms.find((r) => r.id === id);
  while (hasAlredy) {
    id = Array(6)
      .fill(null)
      .map((c) => (c = chrs[Math.floor(Math.random() * chrs.length)]))
      .join("");
  }
  return id;
}
