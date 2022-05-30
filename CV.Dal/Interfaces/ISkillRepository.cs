using CV.Domain.Models.Content;

namespace CV.Dal.Interfaces
{
    public interface ISkillRepository : IRepository<Skill>
    {
        public IEnumerable<Skill> GetAllSkills();
        public Skill GetSkillByName(string name);
    }
}
