import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from "../Components/CodeEditor";
import { MdOutlineContentCopy } from "react-icons/md";
import Footer from "../Components/Footer";
import socket from '../utils/Socket';

const Editor = () => {
  const { roomId, username } = useParams();
  const [code, setCode] = useState('// Write your code here');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (roomId && username) {
      // Join room
      socket.emit('join-room', roomId, username);
      console.log('Joining room:', roomId, username); // Debug log

      // Listen for initial code
      socket.on('initial-code', (initialCode) => {
        console.log('Received initial code:', initialCode); // Debug log
        setCode(initialCode);
      });

      // Listen for code updates from other users
      socket.on('code-update', (updatedCode) => {
        console.log("Received updated code:", updatedCode); // Debug log
        setCode(updatedCode);
      });

      // Listen for user list updates
      socket.on('user-list', (userList) => {
        console.log("Received user list:", userList); // Debug log
        setUsers(userList);
      });

      // Clean up listeners when component unmounts
      return () => {
        socket.off('initial-code');
        socket.off('code-update');
        socket.off('user-list');
      };
    }
  }, [roomId, username]);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    // Optionally, you can add some feedback to the user that the ID was copied
  };

  if (!roomId || !username) {
    return <div>Invalid room or username</div>;
  }

  return (
    <div className="container mx-auto p-4 font-mono bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">
        Minimalist Code Editor
      </h1>
      <div className="flex m-10">
        {/* Left sidebar */}
        <div className="w-1/4 pr-4 text-gray-400">
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-white font-bold">Room_id: {roomId}</h2>
              <button 
                className="bg-[#21293B] p-1 rounded hover:text-[#a08521] text-sm"
                onClick={copyRoomId}
              >
                <MdOutlineContentCopy />
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-white font-bold mb-2">Users</h2>
            <h2 className="text-white font-bold mb-2">.................</h2>
            <ul className="space-y-1">
              {users.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Main content */}
        <div className="w-3/4">
          <div className="mb-2 flex justify-between items-center">
            <span className="text-white font-bold">
              Code 
              <button 
                className="bg-[#21293B] p-1 rounded text-xl hover:text-[#a08521] text-gray-400 ml-2"
                onClick={() => navigator.clipboard.writeText(code)}
              >
                <MdOutlineContentCopy />
              </button>
            </span>
          </div>
          <CodeEditor
            code={code}
            setCode={setCode}
            roomId={roomId}
            
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Editor;
