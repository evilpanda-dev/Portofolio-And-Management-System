using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Repository.GenericRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Repository.EducationRepository
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
