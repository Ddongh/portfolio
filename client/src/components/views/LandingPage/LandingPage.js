import React, { useEffect, useState } from 'react';
import Axios from 'axios';
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
            <QuestionDetail selectedQuestion={selectedQuestion} />
        );
    }
  
}

export default LandingPage;
