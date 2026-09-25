import { useState, type FormEvent } from "react";
import { socket } from "../App";
import type { Response } from "../types";
import { useNavigate } from "react-router";

export const CreatingGame = () => {
  const nanigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const handleCreateRoom = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("room:create", { name: name }, (response: Response) => {
      console.log(response);
      if (response.success) {
        nanigate("/waiting", {
          state: { room: response.room, yourColor: response.yourColor },
        });
      } else {
        setErrorMessage(response.error?.message);
      }
    });
  };
  return (
    <>
      <form onSubmit={(e) => handleCreateRoom(e)}>
        <input
          type="text"
          placeholder="הכנס שם"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">צור משחק</button>
      </form>
      {errorMessage && <h2>{errorMessage}</h2>}
    </>
  );
};
