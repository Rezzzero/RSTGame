import { io } from "socket.io-client";

const connectSocket = () => {
  const socket = io("http://localhost:8080", {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });

  socket.on("connect", () => {
    console.log("Connected with socket ID:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  return socket;
};

export default connectSocket;
