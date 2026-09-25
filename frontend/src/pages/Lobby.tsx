import { useState } from "react";
import { CreatingGame } from "../components/CreatingGame";

const Lobby = () => {
  const [showCreatingGame, setShowCreatingGame] = useState<boolean>(false);
  if (showCreatingGame){
    return <CreatingGame/>
  }

  return (
    <div>
      <h1>שש־בש אונליין - לובי</h1>
      <button onClick={() => setShowCreatingGame(true)}>צור משחק חדש</button>
      <br />
      <button>הצטרף למשחק</button>
      <br />
    </div>
  );
};

export default Lobby;
