import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import socket from "../utils/Socket";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showInput, setShowInput] = useState(false);
  const [showNewRoomInput, setShowNewRoomInput] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("check-health", "kjbkajbvkajb");
    socket.on("rest", (data) => {
      console.log(data);
    });

    // Cleanup function
    return () => {
      socket.off("rest");
    };
  }, []);

  const handleJoinRoom = () => {
    setShowInput(true);
    setShowNewRoomInput(false);
  };

  const handleCreateRoom = () => {
    setShowNewRoomInput(true);
    setShowInput(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRoomIdChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleSubmitRoomId = () => {
    if (roomId.trim() && name.trim()) {
      console.log(`Joining room with ID: ${roomId}, Name: ${name}`);
      navigate(`/editor/${roomId}/${name}`);
    } else {
      alert("Please enter both room ID and name");
    }
  };

  const handleCreateRoomSubmit = async () => {
    if (name.trim()) {
      const response = await fetch("https://editor-server-4yde.onrender.com/createroom");
      const res = await response.json();
      console.log(res);

      if (res.roomId) {
        setRoomId(res.roomId);
        navigate(`/editor/${res.roomId}/${name}`);
      } else {
        alert("Failed to create room. Please try again.");
      }
    } else {
      alert("Please enter your name");
    }
  };

  return (
    <div className="font-mono text-gray-400 h-screen flex flex-col items-center justify-center">
      {!showInput && !showNewRoomInput ? (
        <>
          <button
            className="text-2xl mb-4 hover:text-[#a08521]"
            onClick={handleJoinRoom}
          >
            Join a Room
          </button>
          <p className="text-sm mb-4">-----or-----</p>
          <button
            className="text-2xl hover:text-[#a08521]"
            onClick={handleCreateRoom}
          >
            Create a Room
          </button>
        </>
      ) : showInput ? (
        <div className="flex flex-col items-center">
          <input
            className="border-b border-gray-400 px-2 py-1 mb-4 bg-transparent text-xl"
            placeholder="Enter Your Name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            className="border-b border-gray-400 px-2 py-1 mb-4 bg-transparent text-xl"
            placeholder="Enter Room Id"
            value={roomId}
            onChange={handleRoomIdChange}
          />
          <button
            className="text-lg border px-2 py-1 mb-4 rounded font-bold hover:text-[#a08521] hover:border-[#a08521]"
            onClick={handleSubmitRoomId}
          >
            Join
          </button>
        </div>
      ) : (
        <div className="new-room-id-input flex flex-col gap-10">
          <input
            className="border-b border-gray-400 px-2 py-1 mb-4 bg-transparent text-xl"
            placeholder="Enter Your Name"
            value={name}
            onChange={handleNameChange}
          />
          <button
            className="text-lg border px-2 py-1 mb-4 rounded font-bold hover:text-[#a08521] hover:border-[#a08521]"
            onClick={handleCreateRoomSubmit}
          >
            Create Room
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
