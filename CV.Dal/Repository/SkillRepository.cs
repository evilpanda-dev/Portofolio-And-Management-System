using CV.Dal.Interfaces;
using CV.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;

namespace CV.Dal.Repository
{
    public class SkillRepository : Repository<Skill>, ISkillRepository
    {
        public SkillRepository(DbContext context) : base(context)
        {
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
