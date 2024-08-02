import CodeEditor from "../Components/CodeEditor";
import { MdOutlineContentCopy } from "react-icons/md";
import Footer from "../Components/Footer";

export const Editor = () => {
  const handleCodeChange = (newCode) => {
    console.log("New code:", newCode);
    // Here you can send the new code via socket.io
  };

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
              <h2 className="text-white font-bold">Room_id: 55439</h2>
              <button className="bg-[#21293B] p-1 rounded hover:text-[#a08521] text-sm">
                <MdOutlineContentCopy />
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-white font-bold mb-2">Users</h2>
            <h2 className="text-white font-bold mb-2">.................</h2>
            <ul className="space-y-1">
              <li>Yuvraj</li>
              <li>Tanish</li>
            </ul>
          </div>
        </div>
        
        {/* Main content */}
        <div className="w-3/4">
          <div className="mb-2 flex justify-between items-center">
            <span className="text-white font-bold">Code <button className="bg-[#21293B] p-1 rounded text-xl hover:text-[#a08521] text-gray-400">
              <MdOutlineContentCopy />
            </button></span>
            
          </div>
          <CodeEditor
            initialValue="// Write your code here"
            onChange={handleCodeChange}
            language="javascript"
            theme="monokai"
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Editor;