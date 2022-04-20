using CVapp.DTOs;
using CVapp.Helpers;
using CVapp.Models.Authentification;
using CVapp.Repository.GenericRepository;
using CVapp.Repository.UserRepository;
using LoggerService;
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
        private readonly ILoggerManager _logger;
        
        public AuthController(IRepository<User> repository,IUserRepository<User> userRepository, JwtService jwtService,ILoggerManager logger)
        {
            _repository = repository;
            _userRepository = userRepository;
            _jwtService = jwtService;
            _logger = logger;
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
            _logger.LogInfo($"User {user.UserName} is registering");
            
            if (dto.Email == "artiom.suruc@outlook.com")
            {
                user.Role = "Admin";
            }

            if (_userRepository.GetByEmail(dto.Email) != null)
            {
                _logger.LogError($"User {user.UserName} is already registered");
                return BadRequest("An account with this email already exists");
            }
            if (_userRepository.GetByUserName(dto.UserName) != null)
            {
                _logger.LogError($"User {user.UserName} is already registered");
                return BadRequest("An account with this username already exists");
            }
            if (dto.Password.Length < 8)
            {
                _logger.LogError($"User {user.UserName} password is too short");
                return BadRequest("Password must be at least 8 characters long");
            }
            _logger.LogInfo($"User {user.UserName} is successeful registered");
            return Created("succes", _repository.Create(user));
        }

        
        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            _logger.LogInfo($"Login attempt for user: {dto.Email}");
            var user = _userRepository.GetByEmail(dto.Email);
            if (user == null)
            {
                _logger.LogError($"Login attempt failed for user: {dto.Email} because the email is not matching");
                return BadRequest(new { message = "The email is not matching" });
            }
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                _logger.LogError($"Login attempt failed for user: {dto.Email} because the password is not matching");
                return BadRequest(new { message = "The password is not matching" });
            }
            if (dto.Email == "artiom.suruc@outlook.com")
            {
                dto.Role = "Admin";
            }

            var jwt = _jwtService.Generate(dto,user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddMinutes(300),
                IsEssential = true,
                SameSite = SameSiteMode.None,
                Secure = true
            });
            _logger.LogInfo("Login succesful");
            return Ok(new { message = "Succesfully logged in" });
        }

        [HttpGet("user")]
        public IActionResult User()
        {
            _logger.LogInfo("User info requested");
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
                _logger.LogError($"User info request failed: {e.Message}");
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            _logger.LogInfo("User attempt to log out");
            
            Response.Cookies.Delete("jwt",new CookieOptions(){
                Expires = DateTime.Now.AddDays(-1),
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                IsEssential = true
            });
            
            _logger.LogInfo("Logout succesful");
            
            return Ok(new { message = "Succesfully logged out" });
        }
        
    }
}
