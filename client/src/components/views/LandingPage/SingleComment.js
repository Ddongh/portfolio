import React, {useState} from 'react'
import { Comment, Avatar, Button, Input } from 'antd';

const {TextArea} = Input;

function SingleComment() {

    const [openReply, setOpenReply] = useState(false);

    const onClickReplyOpen = () => {
        setOpenReply(!openReply);
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author
                avatar={<Avatar src alt />}
                content
            />

            {openReply && 
                <form style={{ display: 'flex'}} onSubmit> 
                    <TextArea
                        style={{width:"100%", borderRadius:"5px"}}
                        onChange
                        value
                        placeholder='댓글을 작성해 주세요.'
                    />
                    <br />
                    <Button 
                        type='primary' 
                        size="large" 
                        style={{ width:"20%", height:"50px"}} 
                        onClick
                    >
                    등록
                    </Button>
                    
                </form>
            }

            
        </div>
    )
}

export default SingleComment