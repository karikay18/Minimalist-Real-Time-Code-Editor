import  { useState } from 'react';

const Home = () => {
  const [showInput, setShowInput] = useState(false);
  const [roomId, setRoomId] = useState('');

  const handleJoinRoom = () => {
    setShowInput(true);
  };

  const handleCreateRoom = () => {
    
  };

  const handleInputChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleSubmitRoomId = () => {
   
    console.log(`Joining room with ID: ${roomId}`);
  };

  return (
    <div className="font-mono text-gray-400  h-screen flex flex-col items-center justify-center">
      {!showInput ? (
        <>
          <button className="text-2xl mb-4 hover:text-[#a08521]" onClick={handleJoinRoom} >
            Join a Room
          </button>
          <p className="text-sm mb-4">-----or-----</p>
          <button className="text-2xl hover:text-[#a08521]" onClick={handleCreateRoom}>
            Create a Room
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <input
            className="border-b border-gray-400  px-2 py-1 mb-4 bg-transparent text-xl"
            placeholder="Enter Room Id"
            value={roomId}
            onChange={handleInputChange}
          />
          <button className="text-lg border px-2 py-1 mb-4 rounded font-bold hover:text-[#a08521] hover:border-[#a08521]" onClick={handleSubmitRoomId}>
            Join
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;