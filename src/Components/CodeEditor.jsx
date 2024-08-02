import  { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

// Import necessary modes and themes
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = ({ initialValue = '', onChange, language = 'javascript', theme = 'monokai' }) => {
  const [value, setValue] = useState(initialValue);
  const editorRef = useRef(null);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <AceEditor
      mode={language}
      theme={theme}
      onChange={handleChange}
      value={value}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
      style={{ width: '596px', height: '527px' }}
      ref={editorRef}
    />
  );
};

CodeEditor.propTypes = {
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
  language: PropTypes.string,
  theme: PropTypes.string,
};

CodeEditor.defaultProps = {
  initialValue: '',
  onChange: () => {},
  language: 'javascript',
  theme: 'monokai',
};

export default CodeEditor;