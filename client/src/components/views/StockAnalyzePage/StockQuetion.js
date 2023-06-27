import React, { useRef, useState } from 'react';
import { Button, message } from 'antd';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Axios from 'axios';
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

        debugger;
        const variable = {
            stock: newState.stock,
            stockName: newState.stockName,
            method: newState.method,
            start: newState.start,
            end: newState.end,
            data: newState.data,
            answer: newState.answer,
            question: newState.question,

        }
        
        Axios.post('/api/stock/stockAnalyze/question', variable)
            .then(response => {
                if(response.data.success) {
                    //console.log(response.data)
                    message.success('성공적으로 게시했습니다.')
                    setTimeout(() => {
                        props.history.push('/')
                    }, 3000)
                       
                } else {
                    alert('비디오 업로드에 실패했습니다.')
                }
            })
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
