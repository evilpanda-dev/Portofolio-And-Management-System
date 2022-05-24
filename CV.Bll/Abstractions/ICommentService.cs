using CV.Common.DTOs;

namespace CV.Bll.Abstractions
{
    public interface ICommentService
    {
        public CommentResponse GetAllComments(int page);
        public CommentDto AddNewComment(CommentDto commentDto);
        public CommentDto UpdateComment(int id, CommentDto commentDto);
        public void DeleteComment(int id);
    }
}
