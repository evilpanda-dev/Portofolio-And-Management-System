using CVapp.DTOs;
using CVapp.Helpers;
using CVapp.Models.Authentification;
using CVapp.Repository.GenericRepository;
using CVapp.Repository.UserRepository;
using Microsoft.AspNetCore.Mvc;

namespace CVapp.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : Controller
    {
        private readonly IRepository<User> _repository;
        private readonly IUserRepository<User> _userRepository;
        private readonly JwtService _jwtService;
        public AuthController(IRepository<User> repository,IUserRepository<User> userRepository, JwtService jwtService)
        {
            _repository = repository;
            _userRepository = userRepository;
            _jwtService = jwtService;
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
            var user = _userRepository.GetByEmail(dto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "User not found" });
            }
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Wrong password" });
            }
            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true,
            });

            return Ok(new { message = "Succesfully logged in" });
        }

        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);

                return Ok(user);
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { message = "Succesfully logged out" });
        }
    }
}
