using CVapp.Domain.Models.Content;

namespace CVapp.Infrastructure.Repository.CommentRepository
{
    public interface ICommentRepository
    {
        public IEnumerable<Comment> GetAllComments();

    }
}
