import React, { useState } from 'react';
import CandleStickChart from './CandleStickChart';
import { Button, message } from 'antd';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { useRef } from 'react';

const AnalyzeResult = (props) => {
    const {stock, stockName, method, start, end, data, answer, question, ai_answer} = props.state;
    const updateState = props.updateState;
    const user = useSelector(state => state.user);
    const titleRef = useRef();

    const saveQuestion = () => {
        // titleRef
        debugger;
        alert("저장하기!!!!!!!!");
    }
    
    // const [editorState, setEditorState] = useState(() =>
    //     EditorState.createEmpty()
    // );
    
    return (
        
        <div style={{ width:"50%" }}>
            <div style={{marginTop:"10%"}}>
                <Button type="primary" size="large" onClick={saveQuestion}> 
                    등록하기
                </Button>
            </div>
            <div>
                <CandleStickChart props={props.state} />
            </div>
            <table style={{marginTop:"10%"}}>
            <colgroup>
                <col width={"10%"} />
                <col width={"40%"} />
                <col width={"10%"} />
                <col width={"40%"} />
            </colgroup>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td colSpan={3}>
                            <input ref={titleRef} type='text' style={{width:"100%"}} />
                        </td>
                    </tr>
                    <tr>
                        <th>종목명</th>
                        <td>{ stockName }</td>
                        <th>종목코드</th>
                        <td>{ stock }</td>
                    </tr>
                    <tr>
                        <th>분석 시작일</th>
                        <td>{ start }</td>
                        <th>분석 종료일</th>
                        <td>{ end }</td>
                    </tr>
                    <tr>
                        <th>분석방법</th>
                        <td>{ method }</td>
                        <th></th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>최근동향</th>
                        <td colspan="3"> { ReactHtmlParser(ai_answer) } </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <Editor />
            </div>
            
        </div>
    );
}

export default AnalyzeResult;