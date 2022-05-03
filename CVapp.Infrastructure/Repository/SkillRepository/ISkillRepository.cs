using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Repository.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Repository.SkillRepository
{
    public interface ISkillRepository: IRepository<Skill>
    {
        public IEnumerable<Skill> GetAllSkills();
        public Skill GetSkillByName(string name);
    }
}
