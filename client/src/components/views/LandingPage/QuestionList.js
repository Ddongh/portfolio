import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import Axios from 'axios';

const QuestionList = ({ setSelectedQuestion }) => {
    
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(10);

    useEffect(() => {
        Axios.get('/api/landing')
        .then(response => {
            setQuestions(response.data.questions);
            debugger;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const handleQuestionClick = question => {
        setSelectedQuestion(question)
        // 선택된 질문 처리 로직
    };

    // 현재 페이지에서 표시할 질문 목록 계산
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    // 페이지 변경 이벤트 핸들러
    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };

    // 페이지 네이션 컴포넌트 생성
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(questions.length / questionsPerPage); i++) {
        pageNumbers.push(i);
    }

    const rowStyle = { height: '50px' };

    const columns = [
        {
          title: '제목',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '주식명',
          dataIndex: 'stockName',
          key: 'stockName',
        },
        {
          title: '분석방법',
          dataIndex: 'method',
          key: 'method',
        },
        {
          title: '분석 시작일',
          dataIndex: 'start',
          key: 'start',
        },
        {
          title: '분석 종료일',
          dataIndex: 'end',
          key: 'end',
        },
        {
          title: '작성일',
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
        // {
        //   title: 'Action',
        //   key: 'action',
        //   render: (text, record) => (
        //     <Button onClick={() => handleQuestionClick(record)} type="link">
        //       View Details
        //     </Button>
        //   ),
        // },
      ];

    return (
        <div className="app_l">
        <h2>질문 목록</h2>
        {/* <Table dataSource={questions} columns={columns} /> */}
        <Table style={{width:"50%"}} dataSource={currentQuestions} columns={columns} pagination={true} rowClassName={() => 'custom-row-style'}/>
        <table style={{ width: "50%" }}>
            <thead>
            <tr>
                <th>제목</th>
                <th>주식명</th>
                <th>분석방법</th>
                <th>분석 시작일</th>
                <th>분석 종료일</th>
                <th>작성일</th>
            </tr>
            </thead>
            <tbody>
            {currentQuestions.map((question, index) => (
                <tr key={index} 
                onClick={() => handleQuestionClick(question)}
                style={{ cursor: 'pointer' }}
                >
                <td>{question.title}</td>
                <td>{question.stockName}</td>
                <td>{question.method}</td>
                <td>{question.start}</td>
                <td>{question.end}</td>
                <td>{question.createdAt}</td>
                </tr>
            ))}
            </tbody>
        </table>

        {/* 페이지 네이션 */}
        <div style={{ marginTop: '20px' }}>
            {pageNumbers.map(number => (
            <button key={number} onClick={() => handlePageChange(number)}>
                {number}
            </button>
            ))}
        </div>

        {/* 선택된 질문 */}
        {/* ... */}
        </div>
    );
}

export default QuestionList;