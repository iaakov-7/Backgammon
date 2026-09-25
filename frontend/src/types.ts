interface Error {
  code: string;
  message: string;
}

interface Player {
  socketId: string;
  name: string;
  color: "white" | "black";
}

export interface Room {
  id: string;
  status: string;
  players: Player[];
  game?: object;
}

export interface Response {
  success: boolean;
  error?: Error;
  room?: Room;
  yourColor?: string;
}
