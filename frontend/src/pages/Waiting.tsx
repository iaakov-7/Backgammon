import { useState } from "react";
import { useLocation } from "react-router";
import type { Room } from "../types";

const Waiting = () => {
  const location = useLocation();
  const [room, setRoom] = useState<Room>(location.state.room);
  const { yourColor } = location.state;

  return (
    <div>
      <p>{`הצבע שלך: ${yourColor}`}</p>
    </div>
  );
};

export default Waiting;
