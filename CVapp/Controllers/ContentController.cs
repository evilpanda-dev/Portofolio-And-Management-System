using CV.Bll.Abstractions;
using CV.Common.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CV.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class ContentController : Controller
    {
        private readonly IContentService _contentService;

        public ContentController(IContentService contentService)
        {
            _contentService = contentService;
        }

        [HttpGet("educations")]
        public IEnumerable<EducationDto> GetEducationContent()
        {
            var data = _contentService.GetEducationContent();
            return data;
        }

        [HttpPost("addEducation")]
        public EducationDto AddEducationContent(EducationDto educationDto)
        {
            var data = _contentService.AddNewEducation(educationDto);
            return data;
        }

        [HttpPatch("updateEducation/{id}")]
        public EducationDto UpdateEducationContent(int id, EducationDto educationDto)
        {
            var data = _contentService.UpdateEducation(id, educationDto);
            return data;
        }

        [HttpDelete("deleteEducation/{id}")]
        public void DeleteEducationContent(int id)
        {
            _contentService.DeleteEducation(id);
        }

        [HttpGet("skills")]
        public IEnumerable<SkillDto> GetSkillsContent()
        {
            var data = _contentService.GetSkillContent();
            return data;
        }

        [HttpPost("skills")]
        public SkillDto PostSkillContent(SkillDto skillDto)
        {
            var data = _contentService.AddNewSkill(skillDto);
            return data;
        }

        [HttpDelete("deleteSkill/{name}")]
        public void DeleteSkill(string name)
        {
            _contentService.DeleteSkill(name);
        }

        [HttpPatch("updateSkill/{name}")]
        public StatusCodeResult UpdateSkill(string name, SkillDto skillDto)
        {
            _contentService.UpdateSkillRange(name, skillDto);
            return StatusCode((int)HttpStatusCode.OK);
        }

        [HttpPost("subscribeToNewsletter/{id}")]
        public async Task<NewsletterDto> SubscribeToNewsletter(int id, NewsletterDto newsletterDto)
        {
            var data = await _contentService.AddEmailToNewsletterAsync(id, newsletterDto);
            return data;
        }

        [HttpGet("checkEmail/{id}")]
        public bool CheckEmail(int id)
        {
            var data = _contentService.CheckIfEmailExists(id);
            return data;
        }

    }
}
