using CV.Common.DTOs;
using CV.Dal.Query;
using CV.Domain.Models.Content;

namespace CV.Dal.Interfaces
{
    public interface ICommentRepository : IRepository<Comment>
    {
        public CommentResponse GetAllCommentsPaginated(int page);
        public List<CommentDto> GetAllUsersComments(QueryParameters queryParameters);
        public int CountUserComments();
    }
}
