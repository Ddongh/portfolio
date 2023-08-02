import React, {useState, useEffect} from 'react'
import {Button, Input} from 'antd'
import Axios from 'axios';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const Comment = ({refreshComment, commentList, selectedQuestion}) => {
    const {TextArea} = Input
    const user = useSelector(state => state.user); // 사용자 정보
    const [commentValue, setCommentValue] = useState(""); // 작성한 comment text

    const handleChange = (e) => { // 댓글 작성시 commentValue update
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit = (e) => { // 댓글 등록 이벤트
        e.preventDefault(); // refresh 방지

        if(commentValue == "") { // 
            alert("댓글을 작성해주세요.")
        }

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            questionId: selectedQuestion._id,
        };

        Axios.post('api/comment/saveComment', variables) // 댓글등록 요청
        .then(response => {
            if(response.data.success) {
                setCommentValue(""); // 작성한 댓글 초기화
                refreshComment(response.data.result); // 저장한 댓글을 댓글 목록에 추가
            } else {
                alert('comment를 저장하지 못했습니다.')
            }
        })
    }

    return (
        <div>
            <br />
            <p> Replies </p>
            {commentList && commentList.map((comment, index) => ( // 댓글 목록이 존재하면
                (!comment.responseTo && // 최상위 댓글만 렌더링(대댓글이 아닌것)
                    <React.Fragment>
                        <SingleComment refreshComment={refreshComment} comment={comment} selectedQuestion={selectedQuestion} />
                        {/* 댓글표시 */}
                        <ReplyComment refreshComment={refreshComment} selectedQuestion={selectedQuestion} parentCommentId={comment._id} commentList={commentList} />
                        {/* 대댓글 표시 및 대댓글 작성 컴포넌트 */}
                    </React.Fragment>
                    )
                
            ))}  

            <form style={{ display: 'flex'}} onSubmit={onSubmit}> {/*  최상위 댓글 작성 영역 */}
                <TextArea
                    style={{width:"100%", borderRadius:"5px"}}
                    onChange={handleChange}
                    value={commentValue} 
                    placeholder='댓글을 작성해 주세요.'
                />
                <br />
                <Button type='primary' size="large" style={{ width:"20%", height:"50px"}} onClick={onSubmit}>등록</Button>
            </form>
        </div>
    )
}

export default Comment 