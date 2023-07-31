import React, {useState} from 'react'
import {useSelector} from 'react-redux';
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';

const {TextArea} = Input;

function SingleComment({refreshComment, comment, selectedQuestion}) {
    const user = useSelector(state => state.user);
    const [openReply, setOpenReply] = useState(false);
    const [commentValue, setCommentValue] = useState("")
    const onClickReplyOpen = () => {
        setOpenReply(!openReply);
    }

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            questionId: selectedQuestion._id,
            responseTo: comment._id,
        };

        Axios.post('api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success) {
                console.log(response.data.result)
                setCommentValue("");
                setOpenReply(false);
                refreshComment(response.data.result);
            } else {
                alert('comment를 저장하지 못했습니다.')
            }
        })
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={comment.writer.name}
                avatar={<Avatar src={comment.writer.image} alt />}
                content={<p>{comment.content}</p>}
            />

            {openReply && 
                <form style={{ display: 'flex'}} onSubmit={onSubmit}> 
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