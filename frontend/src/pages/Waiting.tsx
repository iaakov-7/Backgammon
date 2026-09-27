import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import type { Response, Room } from "../types";
import { socket } from "../App";

const Waiting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [room, setRoom] = useState<Room>(location.state.room);
  const [owner] = useState<boolean>(location.state.owner);
  const { yourColor } = location.state;
  const handleStartGame = () => {
    socket.emit("game:start", (response: Response) => {
      if (!response.success) {
        setErrorMessage(response.error?.message);
      }
    });
  };
  useEffect(() => {
    socket.on("room:state", ({ room }: { room: Room }) => {
      setRoom(room);
      if (room.status === "playing") {
        navigate("/game");
      }
    });
    return () => {
      socket.off("room:state");
    };
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
      {owner && <button onClick={handleStartGame}>התחל משחק</button>}
      {errorMessage && <h3>{errorMessage}</h3>}
    </div>
  );
};

export default Waiting;
