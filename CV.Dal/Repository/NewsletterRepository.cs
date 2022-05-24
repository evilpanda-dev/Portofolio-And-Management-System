using CV.Dal.Interfaces;
using CV.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;

namespace CV.Dal.Repository
{
    public class NewsletterRepository : Repository<Newsletter>, INewsletterRepository
    {
        private readonly DbContext _context;
        private DbSet<Newsletter> _dbSet;

        public NewsletterRepository(DbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<Newsletter>();
        }

        public Newsletter GetByUserId(int id)
        {
            return _dbSet.FirstOrDefault(e => e.UserId == id);
        }

    }
}
