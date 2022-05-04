using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CVapp.API.Controllers
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
        public IActionResult GetEducationContent()
        {
            var data = _contentService.GetEducationContent();
            return Ok(data);
        }

        [HttpPost("addEducation")]
        public IActionResult AddEducationContent(EducationDto educationDto)
        {
            var data = _contentService.AddNewEducation(educationDto);
            return Ok(data);
        }

        [HttpPatch("updateEducation/{id}")]
        public IActionResult UpdateEducationContent(int id, EducationDto educationDto)
        {
            var data = _contentService.UpdateEducation(id, educationDto);
            return Ok(data);
        }

        [HttpDelete("deleteEducation/{id}")]
        public IActionResult DeleteEducationContent(int id)
        {
            _contentService.DeleteEducation(id);
            return Ok();
        }

        [HttpGet("skills")]
        public IActionResult GetSkillsContent()
        {
            var data = _contentService.GetSkillContent();
            return Ok(data);
        }

        [HttpPost("skills")]
        public IActionResult PostSkillContent(SkillDto skillDto)
        {
            var data = _contentService.AddNewSkill(skillDto);
            return Ok(data);
        }

        [HttpDelete("deleteSkill/{name}")]
        public IActionResult DeleteSkill(string name)
        {
            _contentService.DeleteSkill(name);
            return Ok();
        }

        [HttpPatch("updateSkill/{name}")]
        public IActionResult UpdateSkill(string name, SkillDto skillDto)
        {
            _contentService.UpdateSkillRange(name, skillDto);
            return StatusCode((int)HttpStatusCode.OK);

        }

        
    }
}
