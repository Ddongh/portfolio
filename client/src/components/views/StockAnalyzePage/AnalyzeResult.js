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
    const user = useSelector(state => state.user); // 로그인 유저정보

    const titleInputRef = useRef(); // 제목 focus 를 위한 Ref

    const [chartButtonState, setChartButtonState] = useState("차트 숨기기");         // chart dialay button text
    const [chartDisplayState, setChartDisplayState] = useState("block");            // chart display status
    const [titleTrState, setTitleTrState] = useState("none");                       // title tr display status
    const [title, setTitle] = useState("");                                         // question title
    const [questionButtonDisplay, setQuestionButtonDisplay] = useState("block");    // 질문하기 button status
    const [saveButtonState, setSaveButtonState] = useState("none");                 // 질문 저장 button status
    const [editorDisplayState, setEditorDisplayState] = useState("none");           // editor display status
    const [editorState, setEditorState] = useState(EditorState.createEmpty());      // editor text state

    const history = useHistory();

    const saveQuestion = () => { // 질문 저장 

        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);    
        const text = rawContentState.blocks.reduce((a, b) => a + (b.text + "<br>"), "") // text editor 내용 가져오기, 줄바꿈처리

        if(!validate(text)) return // 제목 본문 작성 여부 체크
        
        const variable = {
            writer   : user.userData._id,       // 작성자
            title    : title,                   // 제목
            stock    : stock,                   // 주식코드
            stockName: stockName,               // 주식이름
            method   : method,                  // 분석방법
            start    : start,                   // 분석 시작일
            end      : end,                     // 분석 종료일
            data     : data,                    // 크롤링 및 예측 데이터
            ai_answer   : ai_answer,            // 한달간 동향(openai 답변)
            question : text,                    // 작성한 질문
        }
        
        Axios.post('/api/stock/stockAnalyze/question', variable)
            .then(response => {
                if(response.data.success) {
                    message.success('성공적으로 게시했습니다.')
                    setTimeout(() => { // 3초뒤
                        history.push('/'); // 메인화면으로 이동
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
        setTitleTrState("");                // 제목작성 tr 보이기
        setEditorDisplayState("block");     // 텍스트 에디터 보이기
        setSaveButtonState("block");        // 저장하기 버튼 보이기
        setChartDisplayState("none");       // 차트 숨기기    
        setChartButtonState("차트 보기");    // 차트 display 버튼 text 변경
        setQuestionButtonDisplay("none");   // 질문하기 버튼 숨기기
    }

    useEffect(() => { // 제목작성 tr이 보이면 focus 이동
        if(titleTrState === "") titleInputRef.current.focus(); 
    }, [titleTrState])
    

    const validate = (text) => { // 제목 본문 작성 여부 체크 함수
        if(title == "") {
            alert("제목을 입력해주세요.");
            return false;
        } 
        if(text == "") {
            alert("본문을 작성해주시기 바랍니다.")
            return false;
        }
        return true;
    }

    const onTitleChange = (e) => { // 제목 작성시 state update
        setTitle(e.currentTarget.value);
    }
    
    return (
        <div style={{ width:"50%" }}>
            <div style={{ marginTop: "10%", display: 'flex', justifyContent: 'flex-end' }}>
                <Button style={{display:saveButtonState, marginRight:'10px'}} type="primary" size="large" onClick={saveQuestion}> 
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
                            <input ref={titleInputRef} type='text' value={title} style={{width:"100%"}} onChange={onTitleChange} />
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