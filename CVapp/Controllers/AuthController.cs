using CVapp.DTOs;
using CVapp.Models.Authentification;
using CVapp.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CVapp.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : Controller
    {
        private readonly IRepository<User> _repository;
        public AuthController(IRepository<User> repository)
        {
            _repository = repository;
        }
            
        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User
            {
                UserName = dto.UserName,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };
            
            return Created("succes", _repository.Create(user));
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            
        }
    }
}
