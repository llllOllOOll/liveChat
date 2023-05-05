import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "") {
      socket.emit("join_room", "room");
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <div className="joinChatTitle">
            <h3 className="liveChat">Live Chat</h3>
          </div>
          <div className="joinChatInput">
            <input
              type="text"
              placeholder="Your name..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join</button>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
