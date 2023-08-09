import React, { useEffect, useState } from 'react';
import { Button, Table, Pagination } from 'antd';
import Axios from 'axios';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

const QuestionList = ({ setSelectedQuestion }) => {
    
    const [questions, setQuestions] = useState([]);     // 질문 리스트
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 번호
    const [questionsPerPage] = useState(10);            // 페이지에 표시할 질문 개수
    const [totalCount, setTotalCount] = useState(-1);   // 전체 질문 개수
	const history = useHistory();

    const onRowSelect = (record, index) => {
		// debugger;
		history.push("/questinoDetail/" + record._id)
        // setSelectedQuestion(record);
    }
    useEffect(() => { // 페이지 접근시 전제 질문 개수 가져오기
		Axios.get('/api/landing/total')
			.then(response => {
				setTotalCount(response.data.totalCount) // 전제질문 개수 state update
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

		Axios.get('/api/landing', { params: variable }) // 해당문서 가져오기
			.then(response => {
				// let questions = response.data.questions;
				setQuestions(response.data.questions); // 질문목록 state update
			})
			.catch(error => {
				console.error('Error : ', error);
			});
    }, [currentPage]);

    const handlePageChange = (pageNumber) => { // 페이지 변경 이벤트 핸들러
      	setCurrentPage(pageNumber); // 페이지 번호 update
    };

    const onPageChange = (pageNumber) => {
      	setCurrentPage(pageNumber);
    }

	const stockCodeNameUpdate = () => {
		Axios.get('/api/stock/stockCodeNameUpdate') 
			.then(response => {
				if(response.data.success) {
					console.log("update 완료");
				} else {
					console.log("update error");
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

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
            title: '작성자',
            dataIndex: 'writer',
            key: 'writer',
            render: (writer) => { // 작성자 정보 중 이름 렌더링
                return (
                    writer.name
                );
            }
        },
        {
			title: '작성일',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (createdAt) => { // 날짜 데이터 변환(년월일)
				if (!createdAt) return null; // createdAt 값이 없을 경우 null 반환
					const ymd = createdAt.split("T")[0];
					const hms = createdAt.split("T")[1].split(".")[0];
					const timeData = ymd + " " + hms;
					return (
						timeData
				);
			}
        },
      ];

    return (
        <div className="app">
			<Button type='primary' size="large" onClick={stockCodeNameUpdate} >
				종목 UPDATE
			</Button>
			<h2>질문 목록</h2>
			<Table 
			style={{width:"50%"}} 
			dataSource={questions} 
			columns={columns} 
			pagination={false}
			rowClassName={() => 'custom-row-style'}
			onRow={(record, rowIndex) => {
				return {
					onClick: () => onRowSelect(record, rowIndex), // 각 행을 클릭했을 때 이벤트 처리
				};
			}}
			/>
			<div style={{marginTop:"20px"}}>
				<Pagination defaultCurrent={1} current={currentPage} total={totalCount} onChange={onPageChange} />
			</div>
			
        </div>
    );
}

export default QuestionList;