import React from 'react';
import { Input, Button } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const StockQuestion = (props) => {
    debugger;
    const {
        state,
        updateState
    } = props;
    
    // const {qustion} = state;

    const handleSubmit = () => {
        alert("질문등록!!!!");
        updateState("question", e.target.value);
    }

    const handleQuestionChange = (e) => {
        debugger;
        updateState("question", e.target.value);
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Editor
            // question={qustion} 
            // onChange={handleQuestionChange}
            />
            <Button type='primary' size="large" onClick={handleSubmit}>
                질문등록
            </Button>
        </div>
        
    );
}

export default StockQuestion;