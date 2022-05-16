using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Repository.GenericRepository;
using Microsoft.EntityFrameworkCore;

namespace CVapp.Infrastructure.Repository.CommentRepository
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
