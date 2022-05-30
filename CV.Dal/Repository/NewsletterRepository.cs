using CV.Dal.Interfaces;
using CV.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;

namespace CV.Dal.Repository
{
    public class NewsletterRepository : Repository<Newsletter>, INewsletterRepository
    {
        public NewsletterRepository(DbContext context) : base(context)
        {
        }

        public Newsletter GetByUserId(int id)
        {
            return _dbSet.FirstOrDefault(e => e.UserId == id);
        }

    }
}
