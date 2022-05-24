using CV.Dal.Interfaces;
using CV.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;

namespace CV.Dal.Repository
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        private readonly DbContext _context;
        private DbSet<Comment> _dbSet;

        public CommentRepository(DbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<Comment>();
        }

        public IEnumerable<Comment> GetAllComments()
        {
            return Filter()
                .ToList();
        }
    }
}
