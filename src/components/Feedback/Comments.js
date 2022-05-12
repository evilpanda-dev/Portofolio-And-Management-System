import { useState, useEffect,useContext } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../../api/commentApi.js";
import '././Comments.css';
import { useDispatch } from "react-redux";
import { useAlert } from "../../hooks/useAlert";
import { UserContext } from "../../providers/UserProvider";

const Comments = ({currentUserId,currentUserName,currentAvatar }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [currentPage,setCurrentPage] = useState(1)
  const [fetching,setFetching] = useState(true)
  const [totalCount,setTotalCount] = useState()
  const {user} = useContext(UserContext)
  const scrollHandler = (e) =>{
    // if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && 
    // backendComments.length < totalCount){
    //       setFetching(true)
    // }
    if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight){
        setFetching(true)
    }
}

  useEffect(()=>{
 document.addEventListener('scroll', scrollHandler)

 return ()=>{
    document.removeEventListener('scroll', scrollHandler)
 }
  },[])

  useEffect(() => {
    if(fetching){
        getCommentsApi(currentPage).then((data) => {
          setBackendComments([...backendComments, ...data.comments]);
          setCurrentPage(prevState => prevState + 1)
          setTotalCount(data.pages)
        })
        .finally(()=>{
          setFetching(false)
        });
    }
}, [fetching]);

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (text,parentId) => {
    createCommentApi(text,currentUserName,currentUserId,parentId,currentAvatar).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text,commentId,currentUserName).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });

      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId).then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  let commentForm 
  if(user.role ==="Admin" || user.role ==="User"){
    <div className="comment-form-title">Leave a message : </div>
    commentForm = <CommentForm submitLabel="Write" handleSubmit={addComment} />
  }

  return (
    <div className="comments">
      {/* <h3 className="comments-title">Comments</h3> */}
      {/* <div className="comment-form-title">Leave a message : </div> */}
      {/* <CommentForm submitLabel="Write" handleSubmit={addComment} /> */}
      {commentForm}
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
            imageSrc={rootComment.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;