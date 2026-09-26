import { useState, type FormEvent } from "react";
import { socket } from "../App";
import type { Response } from "../types";
import { useNavigate } from "react-router";

const JoiningGame = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const handleJoinGame = (e: FormEvent) => {
    e.preventDefault();
    socket.emit(
      "room:join",
      { roomCode: code, name: name },
      (response: Response) => {
        if (response.success) {
          navigate("/waiting", {
            state: {
              yourColor: response.yourColor,
              room: response.room,
              owner:false
            },
          });
        } else {
          setErrorMessage(response.error?.message);
        }
      },
    );
  };
  return (
    <>
      <form onSubmit={(e) => handleJoinGame(e)}>
        <input
          type="text"
          placeholder="הכנס את שמך"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="הכנס קוד משחק"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">הצטרף</button>
      </form>
      {errorMessage && <h2>{errorMessage}</h2>}
    </>
  );
};

export default JoiningGame;
