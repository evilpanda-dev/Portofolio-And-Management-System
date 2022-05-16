using CVapp.Domain.Models.Content;

namespace CVapp.Infrastructure.Repository.SkillRepository
{
    public interface ISkillRepository
    {
        public IEnumerable<Skill> GetAllSkills();
        public Skill GetSkillByName(string name);
    }
}
