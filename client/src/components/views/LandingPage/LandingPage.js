import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button, message } from 'antd';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';


const LandingPage = () => {
    const [selectedQuestion, setSelectedQuestion] = useState([])
    
    if(selectedQuestion.length == 0) {
        return (
            <QuestionList setSelectedQuestion={setSelectedQuestion} />
            
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
