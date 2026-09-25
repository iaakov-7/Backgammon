import { io } from "socket.io-client";
import "./App.css";
import Lobby from "./pages/Lobby";
import { BrowserRouter, Route, Routes } from "react-router";
import Waiting from "./pages/Waiting";
export const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(`socket ${socket.id} connected successfully`);
});

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/waiting" element={<Waiting />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
