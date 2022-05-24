using CV.Dal.Interfaces;
using CV.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;

namespace CV.Dal.Repository
{
    public class EducationRepository : Repository<Education>, IEducationRepository
    {
        private readonly DbContext _context;
        private DbSet<Education> _dbSet;

        public EducationRepository(DbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<Education>();
        }

        public IEnumerable<Education> GetAllEducations()
        {
            return Filter()
                .ToList();
        }
    }
}
