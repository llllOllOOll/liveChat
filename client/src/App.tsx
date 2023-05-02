import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <>
      <h1>Join A Chat</h1>
      <input
        type="text"
        placeholder="seven..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="ROOM ID..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join A Room</button>
      <Chat socket={socket} username={username} room={room} />
    </>
  );
}

export default App;
