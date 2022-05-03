using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Abstractions
{
    public interface IContentService
    {
        public IEnumerable<EducationDto> GetEducationContent();
        public IEnumerable<SkillDto> GetSkillContent();
        public SkillDto AddNewSkill(SkillDto skillDto);
        public void DeleteSkill(string name);
    }
}
