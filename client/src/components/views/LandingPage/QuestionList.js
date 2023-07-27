import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import Axios from 'axios';
import { format } from 'date-fns';

const QuestionList = ({ setSelectedQuestion }) => {
    
    const [questions, setQuestions] = useState([]);     // 질문 리스트
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 번호
    const [questionsPerPage] = useState(10);            // 페이지에 표시할 질문 개수
    const [totalCount, setTotalCount] = useState(-1);    // 전체 질문 개수

    useEffect(() => { // 페이지 접근시 전제 질문 개수 가져오기
      Axios.get('/api/landing/total')
      .then(response => {
        setTotalCount(response.data.totalCount)
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
    }, [])
    

    useEffect(() => { // 페이지 변경시 해당하는 문서 가져오기
      const variable = { 
        page: currentPage,             // 현재 페이지 번호
        perPage: questionsPerPage,     // 페이지당 표시될 질문 개수
      };

      Axios.get('/api/landing', { params: variable })
      .then(response => {
          
          let questions = response.data.questions;
          let date = new Date(questions[0].createdAt)
          debugger;
          setQuestions(response.data.questions);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
    }, [currentPage]);

    const handleQuestionClick = question => {
        setSelectedQuestion(question)
        // 선택된 질문 처리 로직
    };

    const handlePageChange = (pageNumber) => { // 페이지 변경 이벤트 핸들러
      setCurrentPage(pageNumber); // 페이지 번호 update
    };

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
      ];

    return (
        <div className="app">
          <h2>질문 목록</h2>
          <Table 
          style={{width:"50%"}} 
          dataSource={questions} 
          columns={columns} 
          pagination={{
              total: totalCount, // 전체 데이터 개수 설정
              pageSize: questionsPerPage, // 한 페이지당 표시할 데이터 개수 설정
              onChange: handlePageChange, // 페이지 변경 이벤트 핸들러 설정
            }}
          rowClassName={() => 'custom-row-style'}/>
        </div>
    );
}

export default QuestionList;