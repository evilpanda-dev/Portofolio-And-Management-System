using AutoMapper;
using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Exceptions;
using CVapp.Infrastructure.Helpers;
using CVapp.Infrastructure.Repository.EducationSectionRepository;
using CVapp.Infrastructure.Repository.SkillRepository;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Services
{
    public class ContentService : IContentService
    {
        private readonly IEducationRepository _educationRepository;
        private readonly ISkillRepository _skillRepository;
        private readonly IMapper _mapper;

        public ContentService(IEducationRepository educationRepository, IMapper mapper, ISkillRepository skillRepository)
        {
            _educationRepository = educationRepository;
            _mapper = mapper;
            _skillRepository = skillRepository;
        }
        
        public IEnumerable<EducationDto>  GetEducationContent()
        {
            try
            {    
            var educations = _educationRepository.GetAllEducations();
                var educationResult = _mapper.Map<IEnumerable<EducationDto>>(educations);
                var educationResultArray = educationResult.ToArray();
                
                return educationResultArray;
            } catch
            {
                throw new Exception("Error in getting education data");
            }
            
        }

        public IEnumerable<SkillDto> GetSkillContent()
        {
            try
            {
                var skills = _skillRepository.GetAllSkills();
                var skillResult = _mapper.Map<IEnumerable<SkillDto>>(skills);
                var skillResultArray = skillResult.ToArray();

                return skillResultArray;
            }
            catch
            {
                throw new Exception("Error in getting education data");
            }

        }

        public SkillDto AddNewSkill(SkillDto skillDto)
        {
            var skill = new Skill
            {
                Name = skillDto.Name,
                Range = skillDto.Range
            };
            var skillFromDb = _skillRepository.GetSkillByName(skillDto.Name);
            if (skillFromDb != null)
            {
                throw new DuplicateException("Skill already exists");
            }
            
            try
            {
                _skillRepository.Create(skill);
            } catch
            {
                throw new Exception("Error in adding new skill");
            }
            return new SkillDto
            {
                Name = skill.Name,
                Range = skill.Range
            };
        }

        public SkillDto UpdateSkillRange(string name, SkillDto skillDto)
        {
            try
            {
                var skill = _skillRepository.GetSkillByName(name);
                if (skill == null)
                {
                    throw new SkillNotFoundException("Skill not found");
                }
                var propertyMapper = new PropertyMapper<SkillDto, Skill>(skillDto, skill);
                propertyMapper.Map(skillDto, skill)
                   .ForMember(x => x.Range);
                _skillRepository.SaveChanges();
            }
            catch
            {
                throw new Exception("Error in updating skill");
            }
            return skillDto;
        }

        public void DeleteSkill(string name)
        {
            var skill = _skillRepository.GetSkillByName(name);
            if (skill == null)
            {
                throw new SkillNotFoundException("Skill not found");
            }
            try
            {
                _skillRepository.Delete(skill);
            }
            catch
            {
                throw new Exception("Error in deleting skill");
            }
        }

        public EducationDto AddNewEducation(EducationDto educationDto)
        {
            var education = new Education
            {
                Date = educationDto.Date,
                Title = educationDto.Title,
                Text = educationDto.Text
            };
            var educationFromDb = _educationRepository.GetById(educationDto.Id);
            if (educationFromDb != null)
            {
                throw new DuplicateException("Skill already exists");
            }

            try
            {
                _educationRepository.Create(education);
            }
            catch
            {
                throw new Exception("Error in adding new education");
            }
            return new EducationDto
            {
                Date = education.Date,
                Title = education.Title,
                Text = education.Text
            };
        }

        public EducationDto UpdateEducation(int id, EducationDto educationDto)
        {
            try
            {
                var education = _educationRepository.GetById(id);
                if (education == null)
                {
                    throw new EducationNotFoundException("Education not found");
                }
                var propertyMapper = new PropertyMapper<EducationDto, Education>(educationDto, education);
                propertyMapper.Map(educationDto, education)
                   .ForMember(x => x.Date)
                   .ForMember(x => x.Title)
                   .ForMember(x => x.Text);
                _educationRepository.SaveChanges();
            }
            catch
            {
                throw new Exception("Error in updating education");
            }
            return educationDto;
        }

        public void DeleteEducation(int id)
        {
            var education = _educationRepository.GetById(id);
            if (education == null)
            {
                throw new EducationNotFoundException("Education not found");
            }
            try
            {
                _educationRepository.Delete(education);
            }
            catch
            {
                throw new Exception("Error in deleting education");
            }
        }

    }
}
