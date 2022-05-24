using CV.Domain.Models.Content;

namespace CV.Dal.Interfaces
{
    public interface ICommentRepository
    {
        public IEnumerable<Comment> GetAllComments();

    }
}
