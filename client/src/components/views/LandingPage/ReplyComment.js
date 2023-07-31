import React, {useState, useEffect} from 'react'
import SingleComment from './SingleComment'
const ReplyComment = ({refreshComment, selectedQuestion, parentCommentId, commentList}) => {
    const [childCommentNumber, setChildCommentNumber] = useState(0)
    const [openReplayComments, setOpenReplayComments] = useState(false);
    useEffect(() => {
        let commentNumber = 0;

        commentList.map((comment) => {
            if(comment.responseTo === parentCommentId) {
                commentNumber++;
            }
        })
        setChildCommentNumber(commentNumber);
    }, [])
    

    const renderReplayComment = (parentCommentId) => {
        return (commentList.map((comment, index) => {
            return(
                <React.Fragment>
                    {   
                        // <p>대댓글</p>
                        comment.responseTo === parentCommentId &&
                        <div style={{ width:'80%', marginLeft: '40px'}} >
                            <SingleComment refreshComment={refreshComment} comment={comment} selectedQuestion={selectedQuestion} />
                            <ReplyComment commentList={commentList} selectedQuestion={selectedQuestion} parentCommentId={parentCommentId} />
                        </div>
                    }
                </React.Fragment>    
            )
        }))
    }
        
    const onHandleChange = () => {
        setOpenReplayComments(!openReplayComments);
    }

    return (
        <div>
            {childCommentNumber > 0 &&
                <p style={{ fontSize:'14px', margin: '0', color: 'gray'}} onClick={onHandleChange}>
                View {childCommentNumber} more comment(s)
                </p>
            }
            
            {openReplayComments && 
                renderReplayComment(parentCommentId)
            }
        </div>
    );
}

export default ReplyComment