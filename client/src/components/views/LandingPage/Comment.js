import React, {useState, useEffect} from 'react'
import {Button, Input} from 'antd'
import Axios from 'axios';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const Comment = ({refreshComment, commentList, selectedQuestion}) => {
    const {TextArea} = Input
    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState("");
    const handleClick = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault(); // refresh 방지

        if(commentValue == "") {
            alert("댓글을 작성해주세요.")
        }

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            questionId: selectedQuestion._id,
        };

        Axios.post('api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success) {
                console.log(response.data.result)
                setCommentValue("");
                refreshComment(response.data.result);
            } else {
                alert('comment를 저장하지 못했습니다.')
            }
        })
    }

    return (
        <div>
            <br />
            <p> Replies </p>

            {/* Comment list */}

            {commentList && commentList.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment refreshComment={refreshComment} comment={comment} selectedQuestion={selectedQuestion} />
                        <ReplyComment refreshComment={refreshComment} selectedQuestion={selectedQuestion} parentCommentId={comment._id} commentList={commentList} />
                    </React.Fragment>
                    )
                
            ))}  

            {/* Root Comment List  */}

            <form style={{ display: 'flex'}} onSubmit={onSubmit}> 
                <TextArea
                    style={{width:"100%", borderRadius:"5px"}}
                    onChange={handleClick}
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