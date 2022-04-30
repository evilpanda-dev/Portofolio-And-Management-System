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
    }
}
