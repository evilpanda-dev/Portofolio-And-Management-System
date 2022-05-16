using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Repository.GenericRepository;
using Microsoft.EntityFrameworkCore;

namespace CVapp.Infrastructure.Repository.SkillRepository
{
    public class SkillRepository : Repository<Skill>, ISkillRepository
    {
        private readonly DbContext _context;
        private DbSet<Skill> _dbSet;

        public SkillRepository(DbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<Skill>();
        }

        public IEnumerable<Skill> GetAllSkills()
        {
            return Filter()
                .ToList();
        }

        public Skill GetSkillByName(string name)
        {
            return _dbSet.FirstOrDefault(n => n.Name == name);
        }
    }
}
