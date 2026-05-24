import { io } from "socket.io-client";

const socket = io(
  "https://study-group-backend-b1kf.onrender.com",
  {
    transports: ["websocket", "polling"],
  }
);

export default socket;