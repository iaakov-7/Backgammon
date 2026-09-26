import { useState } from "react";
import { CreatingGame } from "../components/CreatingGame";
import JoiningGame from "../components/JoiningGame";

const Lobby = () => {
  const [showCreatingGame, setShowCreatingGame] = useState<boolean>(false);
  const [showJoiningGame, setJoiningGame] = useState<boolean>(false);
  if (showCreatingGame) {
    return <CreatingGame />;
  }
  if (showJoiningGame) {
    return <JoiningGame />;
  }

  return (
    <div>
      <h1>שש־בש אונליין - לובי</h1>
      <button onClick={() => setShowCreatingGame(true)}>צור משחק חדש</button>
      <br />
      <button onClick={() => setJoiningGame(true)}>הצטרף למשחק</button>
      <br />
    </div>
  );
};

export default Lobby;
