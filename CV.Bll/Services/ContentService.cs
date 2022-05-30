using AutoMapper;
using CV.Bll.Abstractions;
using CV.Common.DTOs;
using CV.Common.Exceptions;
using CV.Dal.Helpers;
using CV.Dal.Interfaces;
using CV.Domain.Models.Content;
using MailChimp.Net;
using MailChimp.Net.Interfaces;
using MailChimp.Net.Models;

namespace CV.Bll.Services
{
    public class ContentService : IContentService
    {
        private readonly IEducationRepository _educationRepository;
        private readonly ISkillRepository _skillRepository;
        private readonly INewsletterRepository _newsletterRepository;
        private readonly IMapper _mapper;

        public ContentService(
            IEducationRepository educationRepository,
            IMapper mapper,
            ISkillRepository skillRepository,
            INewsletterRepository newsletterRepository)
        {
            _educationRepository = educationRepository;
            _mapper = mapper;
            _skillRepository = skillRepository;
            _newsletterRepository = newsletterRepository;
        }

        public IEnumerable<EducationDto> GetEducationContent()
        {
            var educations = _educationRepository.GetAllEducations();
            var educationResult = _mapper.Map<IEnumerable<EducationDto>>(educations);

            return educationResult;

        }

        public IEnumerable<SkillDto> GetSkillContent()
        {
            var skills = _skillRepository.GetAllSkills();
            var skillResult = _mapper.Map<IEnumerable<SkillDto>>(skills);

            return skillResult;

        }

        public SkillDto AddNewSkill(SkillDto skillDto)
        {
            var skillFromDb = _skillRepository.GetSkillByName(skillDto.Name);
            if (skillFromDb != null)
            {
                throw new DuplicateException("Skill already exists");
            }
            var skill = new Skill
            {
                Name = skillDto.Name,
                Range = skillDto.Range
            };
            _skillRepository.Create(skill);

            return new SkillDto
            {
                Name = skill.Name,
                Range = skill.Range
            };
        }


        public SkillDto UpdateSkillRange(string name, SkillDto skillDto)
        {
            var skill = _skillRepository.GetSkillByName(name);
            if (skill == null)
            {
                throw new EntityNotFoundException("Skill not found");
            }
            var propertyMapper = new PropertyMapper<SkillDto, Skill>(skillDto, skill);
            propertyMapper.Map(skillDto, skill)
               .ForMember(x => x.Range);
            _skillRepository.SaveChanges();
            return skillDto;
        }

        public void DeleteSkill(string name)
        {
            var skill = _skillRepository.GetSkillByName(name);
            if (skill == null)
            {
                throw new EntityNotFoundException("Skill not found");
            }
            _skillRepository.Delete(skill);
        }

        public EducationDto AddNewEducation(EducationDto educationDto)
        {
            var educationFromDb = _educationRepository.GetById(educationDto.Id);
            if (educationFromDb != null)
            {
                throw new DuplicateException("Skill already exists");
            }
            var education = new Education
            {
                Date = educationDto.Date,
                Title = educationDto.Title,
                Text = educationDto.Text
            };
            _educationRepository.Create(education);

            return new EducationDto
            {
                Date = education.Date,
                Title = education.Title,
                Text = education.Text
            };
        }

        public EducationDto UpdateEducation(int id, EducationDto educationDto)
        {
            var education = _educationRepository.GetById(id);
            if (education == null)
            {
                throw new EntityNotFoundException("Education not found");
            }
            var propertyMapper = new PropertyMapper<EducationDto, Education>(educationDto, education);
            propertyMapper.Map(educationDto, education)
               .ForMember(x => x.Date)
               .ForMember(x => x.Title)
               .ForMember(x => x.Text);
            _educationRepository.SaveChanges();

            return educationDto;
        }

        public void DeleteEducation(int id)
        {
            var education = _educationRepository.GetById(id);
            if (education == null)
            {
                throw new EntityNotFoundException("Education not found");
            }
            _educationRepository.Delete(education);
            throw new Exception("Error in deleting education");
        }

        public async Task<NewsletterDto> AddEmailToNewsletterAsync(int id, NewsletterDto newsletterDto)
        {
            var newsletterSubscriberFromDb = _newsletterRepository.GetById(newsletterDto.Id);
            if (newsletterSubscriberFromDb != null)
            {
                throw new DuplicateException("Email is already subscribed");
            }

            var listId = "fe8fa4d630";
            var apiKey = "39b7751589939b24bba532d4c8d8dde9-us17";
            IMailChimpManager mailChimpManager = new MailChimpManager(apiKey);
            var newsletterSubscriber = new Newsletter
            {
                Email = newsletterDto.Email,
                UserId = id
            };
            var member = new Member()
            {
                EmailAddress = newsletterSubscriber.Email,
                StatusIfNew = Status.Subscribed
            };
            await mailChimpManager.Members.AddOrUpdateAsync(listId, member);
            _newsletterRepository.Create(newsletterSubscriber);

            return new NewsletterDto
            {
                Id = newsletterSubscriber.Id,
                Email = newsletterSubscriber.Email,
                UserId = newsletterSubscriber.UserId
            };
        }
        public bool CheckIfEmailExists(int id)
        {
            var newsletterSubscriber = _newsletterRepository.GetByUserId(id);
            if (id == 0)
            {
                throw new Exception("Error in checking if email exists");
            }
            if (newsletterSubscriber == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

    }
}
