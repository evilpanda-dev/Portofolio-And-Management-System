using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using Microsoft.AspNetCore.Mvc;

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
        
    }
}
