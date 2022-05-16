import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import Info from "../Info/Info";

let src;

const Comment = ({
    comment,
    replies,
    setActiveComment,
    activeComment,
    updateComment,
    deleteComment,
    addComment,
    parentId = null,
    currentUserId,
    imageSrc
  }) => {
    const isEditing =
      activeComment &&
      activeComment.id === comment.id &&
      activeComment.type === "editing";
    const isReplying =
      activeComment &&
      activeComment.id === comment.id &&
      activeComment.type === "replying";
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    const canDelete =
      currentUserId === comment.userId && replies.length === 0 && !timePassed;
    const canReply = Boolean(currentUserId);
    const canEdit = currentUserId === comment.userId && !timePassed;
    const replyId = parentId ? parentId : comment.id;
    const createdAt = new Date(comment.createdAt).toLocaleDateString("ro-RO");

    if (imageSrc==="") {
        src="http://avatars0.githubusercontent.com/u/246180?v=4"
      } else {
      src=`data:image/jpeg;base64,${imageSrc}`
      }
      
    return (
      <div key={comment.id} className="comment">
        <div className="comment-image-container">
          <img src={src} className="commentAvatar"/>
        </div>
        <div className="comment-right-part">
          <div className="comment-content">
            <div className="userDetails">
                <Link to={`/profile/${comment.userName}`} className="comment-author">
                {comment.userName}
                </Link>
                </div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;{createdAt}</div>
          </div>
          {!isEditing && <Info text={comment.text} />}
          {isEditing && (
            <CommentForm
              submitLabel="Update"
              hasCancelButton
              initialText={comment.text}
              handleSubmit={(text) => updateComment(text, comment.id)}
              handleCancel={() => {
                setActiveComment(null);
              }}
            />
          )}
          <div className="comment-actions">
            {canReply && (
              <div
                className="comment-action"
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "replying" })
                }
              >
                Reply
              </div>
            )}
            {canEdit && (
              <div
                className="comment-action"
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "editing" })
                }
              >
                Edit
              </div>
            )}
            {canDelete && (
              <div
                className="comment-action"
                onClick={() => deleteComment(comment.id)}
              >
                Delete
              </div>
            )}
          </div>
          {isReplying && (
            <CommentForm
              submitLabel="Reply"
              handleSubmit={(text) => addComment(text, replyId)}
            />
          )}
          {replies.length > 0 && (
            <div className="replies">
              {replies.map((reply) => (
                <Comment
                  comment={reply}
                  key={reply.id}
                  setActiveComment={setActiveComment}
                  activeComment={activeComment}
                  updateComment={updateComment}
                  deleteComment={deleteComment}
                  addComment={addComment}
                  parentId={comment.id}
                  replies={[]}
                  currentUserId={currentUserId}
                  imageSrc={reply.image}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Comment;