import React, { useState, useEffect } from "react";
import CandleStickChart from '../StockAnalyzePage/CandleStickChart';
import { Button, message } from 'antd';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { useRef } from 'react';
import Comment from './Comment';
import { updateLocale } from "moment";
// import ReactHtmlParser from 'react-html-parser';

const QuestionDetail = ({ selectedQuestion, record }) => {
    debugger;
    const {stock, stockName, method, start, end, data, question, ai_answer, writer, title } = selectedQuestion;
    const [commentList, setCommentList] = useState([]);
    const user = useSelector(state => state.user); // 로그인 유저정보

    const chartRef = useRef();
    const chartButton = useRef();
    
    const [chartButtonState, setChartButtonState] = useState("차트 숨기기"); // 차트 보이기/숨김 버튼 text state

    const displayChart = () => { // 차트 숨김/보기 이벤트
        if(chartRef.current.style.display == "none") {
            chartRef.current.style.display = 'block';
            setChartButtonState("차트 숨기기");   
        } else {
            chartRef.current.style.display = 'none';    
            setChartButtonState("차트 보기");
        }
    }

    useEffect(() => { // 질문에 해당하는 모든 comment 가져오기
        const variables = {
            questionId : selectedQuestion._id
        }

        Axios.get('api/comment/getComment', { params: variables })
        .then(response => {
            if(response.data.success) {
                setCommentList(response.data.comments); // commentList update
            } else {
                alert('comment를 를 가져오지 못했습니다.')
            }
        })
    }, [])
    
    const refreshComment = (newComment) => { // 댓글 등록 후 refresh function
        setCommentList(commentList.concat(newComment)) // 작성한 질문을 state에 추가
    }

    const editQuestion = () => {
        alert("편집하기~~~~")
    }
    
    return (
        <div style={{ width:"50%" }}>
            <div style={{marginTop:"10%", display: 'flex'}}>
                <Button ref={chartButton} type="primary" size="large" onClick={displayChart}> 
                    {chartButtonState}
                </Button>
                { writer._id === user.userData._id &&
                    <Button type="primary" size="large" onClick={editQuestion} >
                        수정하기
                    </Button>
                }
            </div>
            <div ref={chartRef} style={{display:"block"}}>
                <CandleStickChart props={selectedQuestion} />
            </div>
            <table class="basicTable" style={{marginTop:"10%"}}>
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
                            { title }
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
                        <td>{ writer.name }</td>
                    </tr>
                    <tr>
                        <th>최근동향</th>
                        <td colspan="3"> { ReactHtmlParser(ai_answer) } </td>
                    </tr>
                    <tr>
                        <th>질문</th>
                        <td style={{verticalAlign:"top", height: "300px"}} colspan="3">{ ReactHtmlParser(question) }</td>
                    </tr>
                </tbody>
            </table>
            <Comment refreshComment={refreshComment} commentList={commentList} selectedQuestion={selectedQuestion} />
        </div>
    );
}

export default QuestionDetail;