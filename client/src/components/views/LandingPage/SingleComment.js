import React, {useState} from 'react'
import {useSelector} from 'react-redux';
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';

const {TextArea} = Input;

function SingleComment({refreshComment, comment, selectedQuestion}) {
    const user = useSelector(state => state.user);
    const [openReply, setOpenReply] = useState(false); // 대댓글 display 여부
    const [commentValue, setCommentValue] = useState("") // 작성한 대댓글 text state

    const onClickReplyOpen = () => { // 대댓글 표시/접기 이벤트
        setOpenReply(!openReply);
    }

    const onHandleChange = (e) => { // 대댓글 작성시 commentValue update
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => { // 대댓글 저장 이벤트
        e.preventDefault();

        const variables = {
            content: commentValue,              // 대댓글 text
            writer: user.userData._id,          // 작성자 id
            questionId: selectedQuestion._id,   // 조회중인 질문 id
            responseTo: comment._id,            // 대댓글의 상위 댓글 id
        };

        Axios.post('api/comment/saveComment', variables) // 대댓글 저장
        .then(response => {
            if(response.data.success) {
                setCommentValue("");                    // 작성한 대댓글 text 초기화
                setOpenReply(false);                    // 대댓글 작성창 숨기기
                refreshComment(response.data.result);   // 댓글 목록  Refresh
            } else {
                alert('child comment를 저장하지 못했습니다.')
            }
        })
    }

    const actions = [ // 대댓글 접기/펼기기 기능
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={comment.writer.name}                        // 댓글 작성자
                avatar={<Avatar src={comment.writer.image} alt />}  // 댓글 작성자 이미지
                content={<p>{comment.content}</p>}                  // 작성한 댓글
            />

            {openReply && 
                <form style={{ display: 'flex'}} onSubmit={onSubmit}> {/* 대댓글 작성 form */}
                    <TextArea
                        style={{width:"100%", borderRadius:"5px"}}
                        onChange={onHandleChange}
                        value={commentValue}
                        placeholder='댓글을 작성해 주세요.'
                    />
                    <br />
                    <Button 
                        type='primary' 
                        size="large" 
                        style={{ width:"20%", height:"50px"}} 
                        onClick={onSubmit}
                    >
                    등록
                    </Button>
                </form>
            }
            
        </div>
    )
}

export default SingleComment