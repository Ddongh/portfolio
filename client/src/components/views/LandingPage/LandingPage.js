import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button, message } from 'antd';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';

const LandingPage = () => {
    const [selectedQuestion, setSelectedQuestion] = useState([])

    return (
        <div className={selectedQuestion.length == 0 ? "" : "app_l"}>
            {selectedQuestion.length == 0 ? ( 
                <QuestionList setSelectedQuestion={setSelectedQuestion} />  // 선택한 질문이 없으면 목록표시
            ) : (
                <QuestionDetail selectedQuestion={selectedQuestion} />      // 선택한 질문이 있으면 목록표시
            )}    
        </div>   
    )
}

export default LandingPage;
