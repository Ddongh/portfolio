import React, {useState, useEffect} from 'react'
import SingleComment from './SingleComment'
const ReplyComment = ({refreshComment, selectedQuestion, parentCommentId, commentList}) => {
    const [childCommentNumber, setChildCommentNumber] = useState(0)
    const [openReplayComments, setOpenReplayComments] = useState(false);
    useEffect(() => {
        let commentNumber = 0; // 상위 댓글에 대한 대댓글 개수

        commentList.map((comment) => {
            if(comment.responseTo === parentCommentId) { // responseTo(상위 댓글 id), 상위컴포넌트의 댓글 id
                commentNumber++;
            }
        })
        setChildCommentNumber(commentNumber); // 개수 update
    }, [commentList])
    

    const renderReplayComment = (parentCommentId) => { // 대댓글 그리기
        return (commentList.map((comment, index) => {
            return(
                <React.Fragment>
                    {   
                        comment.responseTo === parentCommentId && // comment의 상위 댓글 id와 부모컴포넌트의 댓글 id가 일치하면
                        <div style={{ width:'80%', marginLeft: '40px'}} >
                            <SingleComment refreshComment={refreshComment} comment={comment} selectedQuestion={selectedQuestion} />
                            <ReplyComment refreshComment={refreshComment} commentList={commentList} selectedQuestion={selectedQuestion} parentCommentId={comment._id} />
                        </div>
                    }
                </React.Fragment>    
            )
        }))
    }
        
    const onHandleChange = () => { // 대댓글 펼치기/접기 이벤트
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