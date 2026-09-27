import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import type { Response, Room } from "../types";
import { socket } from "../App";

const Waiting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [closeReason, setCloseeReason] = useState<string>();
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
    socket.on("room:closed", ({ reason }) => {
      if (reason === "player_left") {
        setCloseeReason("שחקן שני עזב את המשחק");
      }
      if (reason === "player_disconnected") {
        setCloseeReason("שחקן שני נותק מהמשחק");
      }
      setTimeout(() => {
        navigate("/");
      }, 2000);
    });
    return () => {
      socket.off("room:state");
    };
  }, []);
  const handleLeave = () => {
    socket.emit("room:leave", (response: Response) => {
      if (response.success) {
        navigate("/");
      }
    });
  };
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
      <button onClick={handleLeave}>צא מהמשחק</button>
      {closeReason && (
        <p style={{ fontWeight: 800, color: "red" }}>{closeReason}</p>
      )}
    </div>
  );
};

export default Waiting;
