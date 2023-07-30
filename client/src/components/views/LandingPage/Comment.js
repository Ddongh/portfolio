import React, {useState, useEffect} from 'react'
import {Button, Input} from 'antd'
import Axios from 'axios';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';

const Comment = ({selectedQuestion}) => {
    // debugger;
    // console.log(selectedQuestion);
    const {TextArea} = Input
    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState("");
    const [commentList, setCommentList] = useState([]);
    const handleClick = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    useEffect(() => {
        const variables = {
            questionId : selectedQuestion._id
        }

        Axios.get('api/comment/getComment', { params: variables })
        .then(response => {
            if(response.data.success) {
                console.log(response.data.comments)
                setCommentList(response.data.comments);
            } else {
                alert('comment를 를 가져오지 못했습니다.')
            }
        })
    }, [])

    const onSubmit = (e) => {
        e.preventDefault(); // refresh 방지
        debugger;

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

            <SingleComment />

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