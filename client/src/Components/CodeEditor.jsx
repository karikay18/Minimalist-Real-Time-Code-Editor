import PropTypes from 'prop-types';
import Editor from "@monaco-editor/react";
import socket from "../utils/Socket";

const CodeEditor = ({ code, setCode, roomId }) => {
  const handleEditorChange = (newCode) => {
    setCode(newCode);
    console.log("Emitting code change:", newCode);
    socket.emit('code-change', roomId, newCode);
  };

  return (
    <Editor
      height="80vh"
      defaultLanguage="javascript"
      value={code}
      onChange={handleEditorChange}
      options={{
        minimap: { enabled: false },
        fontSize: 16,
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        lineNumbers: "on",
        roundedSelection: false,
        scrollBeyondLastLine: true,
        automaticLayout: true,
      }}
      theme="vs-dark"
    />
  );
};

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired,
};

export default CodeEditor;
