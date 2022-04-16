using CVapp.DTOs;
using CVapp.Helpers;
using CVapp.Models.Authentification;
using CVapp.Repository.GenericRepository;
using CVapp.Repository.UserRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role
            };

            if (dto.Email == "artiom.suruc@outlook.com")
            {
                user.Role = "Admin";
            }

            if (_userRepository.GetByEmail(dto.Email) != null)
            {
                return BadRequest("An account with this email already exists");
            }
            if (_userRepository.GetByUserName(dto.UserName) != null)
            {
                return BadRequest("An account with this username already exists");
            }
            if (dto.Password.Length < 8)
            {
                return BadRequest("Password must be at least 8 characters long");
            }

            return Created("succes", _repository.Create(user));
        }

        
        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _userRepository.GetByEmail(dto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "The email is not matching" });
            }
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "The password is not matching" });
            }
            if (dto.Email == "artiom.suruc@outlook.com")
            {
                dto.Role = "Admin";
            }
/*            else { dto.Role = "User"; }*/
            var jwt = _jwtService.Generate(dto,user.Id);

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
                var jwtCookie = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwtCookie);

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
