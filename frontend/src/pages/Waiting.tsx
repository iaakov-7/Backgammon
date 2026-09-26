import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import type { Room } from "../types";
import { socket } from "../App";

const Waiting = () => {
  const location = useLocation();
  const [room, setRoom] = useState<Room>(location.state.room);
  const [owner] = useState<boolean>(location.state.owner);
  const { yourColor } = location.state;
  useEffect(() => {
    socket.on("room:state", ({ room }: { room: Room }) => {
      setRoom(room);
    });
  }, []);

  return (
    <div>
      <p>{`הצבע שלך: ${yourColor}`}</p>
      <p>{`קוד משחק ${room.id}`}</p>
      <p>{`שחקנים`}</p>
      <ul>
        {room.players.map((p) => (
          <li key={p.socketId}>{p.name}</li>
        ))}
      </ul>
      {owner && <button>התחל משחק</button>}
    </div>
  );
};

export default Waiting;
