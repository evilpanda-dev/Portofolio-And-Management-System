using Microsoft.AspNetCore.Mvc;

namespace CVapp.Controllers
{
    [Route("")]
    [ApiController]
    public class AuthController : Controller
    {
        [HttpGet]
        public IActionResult Register()
        {
            return Ok("succes");
        }
    }
}
