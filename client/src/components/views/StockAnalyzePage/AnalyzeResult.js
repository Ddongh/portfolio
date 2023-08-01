import React, { useState, useEffect } from 'react';
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
    // const updateState = props.updateState;
    const user = useSelector(state => state.user); // 로그인 유저정보

    
    const titleInputRef = useRef(); // 작성한 제목 text를 가져오기 위한 Ref
    // const chartButton = useRef(); // 차트 숨김/보기 처리를 위한 Ref
    const editorRef = useRef(); // 
    const saveButtonRef = useRef();

    const [chartButtonState, setChartButtonState] = useState("차트 숨기기"); // chart dialay button text
    const [chartDisplayState, setChartDisplayState] = useState("block");    // chart display status
    const [titleTrState, setTitleTrState] = useState("none");               // title tr display status
    const [title, setTitle] = useState("");
    const [questionButtonDisplay, setQuestionButtonDisplay] = useState("block"); // 질문하기 button status
    const [saveButtonState, setSaveButtonState] = useState("none");         // 질문 저장 button status
    const [editorDisplayState, setEditorDisplayState] = useState("none");   // editor display status
    const [editorState, setEditorState] = useState(EditorState.createEmpty()); // editor text state

    const history = useHistory();

    const saveQuestion = () => { // 질문 저장 
        if(!validate()) return // 제목 본문 작성 여부
        
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const text = rawContentState.blocks[0].text; // 에디터에 작성한 텍스트 가져오기
        
        const variable = {
            writer   : user.userData._id,       // 작성자
            title    : title,                   // 제목
            stock    : stock,                   // 주식코드
            stockName: stockName,               // 주식이름
            method   : method,                  // 분석방법
            start    : start,                   // 분석 시작일
            end      : end,                     // 분석 종료일
            data     : data,                    // 크롤링 및 예측 데이터
            ai_answer   : ai_answer,               // 한달간 동향(openai 답변)
            question : text,                    // 작성한 질문
        }
        
        Axios.post('/api/stock/stockAnalyze/question', variable)
            .then(response => {
                if(response.data.success) {
                    //console.log(response.data)
                    message.success('성공적으로 게시했습니다.')
                    setTimeout(() => {
                        // props.history.push('/')
                        history.push('/');
                        
                    }, 3000)
                       
                } else {
                    alert('게시에 실패했습니다.')
                }
            })
    }

    const displayChart = () => { // 차트 숨김/보기 이벤트
        chartDisplayState === "block" ? setChartDisplayState("none") : setChartDisplayState("block");
        chartDisplayState === "block" ? setChartButtonState("차트 보기") : setChartButtonState("차트 숨기기");
    }

    const writeQuestion = () => { //질문하기 버튼 이벤트
        setTitleTrState("");
        setEditorDisplayState("block");
        setSaveButtonState("block"); // 저장하기 버튼 보이기
        setChartDisplayState("none");    
        setChartButtonState("차트 보기"); // 차트 버튼 text 변경
        setQuestionButtonDisplay("none"); // 질문하기 버튼 숨기기
    }

    useEffect(() => {
        if(titleTrState === "") titleInputRef.current.focus(); 
    }, [titleTrState])
    

    const validate = () => { // 제목 본문 작성 여부
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const plainText = rawContentState.blocks[0].text; // 에디터에 작성한 텍스트 가져오기

        if(title == "") {
            alert("제목을 입력해주세요.");
            return false;
        } 
        if(plainText == "") {
            alert("본문을 작성해주시기 바랍니다.")
            return false;
        }
        return true;
    }
    
    return (
        
        <div style={{ width:"50%" }}>
            <div style={{ marginTop: "10%", display: 'flex', justifyContent: 'flex-end' }}>
                <Button ref={saveButtonRef} style={{display:saveButtonState, marginRight:'10px'}} type="primary" size="large" onClick={saveQuestion}> 
                    등록하기
                </Button>
                <Button style={{display:questionButtonDisplay, marginRight:'10px'}} type="primary" size="large" onClick={writeQuestion}>
                    질문하기 
                </Button>
                <Button  style={{marginRight:'10px'}} type="primary" size="large" onClick={displayChart}> 
                    {chartButtonState}
                </Button>
            </div>
            <div style={{display:chartDisplayState}}>
                <CandleStickChart props={props.state} />
            </div>
            <table class="basicTable" style={{marginTop:"5%"}}>
            <colgroup>
                <col width={"10%"} />
                <col width={"40%"} />
                <col width={"10%"} />
                <col width={"40%"} />
            </colgroup>
                <tbody>
                    <tr style={{display:titleTrState}}>
                        <th>제목</th>
                        <td colSpan={3}>
                            <input ref={titleInputRef} type='text' style={{width:"100%"}} />
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
                        <th>작성자</th>
                        <td>{ user.userData.name }</td>
                    </tr>
                    <tr>
                        <th>최근동향</th>
                        <td colspan="3"> { ReactHtmlParser(ai_answer) } </td>
                    </tr>
                </tbody>
            </table>
            <div style={{display:editorDisplayState, border:"1px solid #dcdde1", height:"500px"}}>
                <Editor editorState={editorState} onEditorStateChange={setEditorState} />
            </div>
            
        </div>
    );
}

export default AnalyzeResult;