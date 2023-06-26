import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const StockQuestion = (props) => {
  const { state, updateState } = props;

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const text = rawContentState.blocks[0].text;
    
    updateState("question", text, (newState) => {
        alert("질문 등록: " + newState.question);
      });
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="editor-wrapper"
        editorClassName="editor"
      />
      <Button type='primary' size="large" onClick={handleSubmit}>
        질문 등록
      </Button>
    </div>
  );
}

export default StockQuestion;
