import "./App.css";
import { Editor } from "./Pages/Editor";
import Home from "./Pages/Home";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-900 h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
