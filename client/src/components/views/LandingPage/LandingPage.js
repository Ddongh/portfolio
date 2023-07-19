import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button, message } from 'antd';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';


const LandingPage = () => {
    const [selectedQuestion, setSelectedQuestion] = useState([])

    const codeNameSave = () => {
        Axios.get('/api/stock/stockCodeName')
        .then(response => {
            debugger;
            console.log(response.data);
        })
    };
    
    if(selectedQuestion.length == 0) {
        return (
            <div>
            <Button onClick={codeNameSave}>주식 코드저장</Button>
            <QuestionList setSelectedQuestion={setSelectedQuestion} /></div>
            
        );
    } else {
        return (
            <div className="app_l">
                <QuestionDetail selectedQuestion={selectedQuestion} />
            </div>
        );
    }
  
}

export default LandingPage;
