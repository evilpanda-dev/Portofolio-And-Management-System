using CVapp.Domain.Models.Authentification;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Exceptions;
using CVapp.Infrastructure.Repository.GenericRepository;
using CVapp.Infrastructure.Services;
using LoggerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CVapp.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : Controller
    {
        private readonly JwtService _jwtService;
        private readonly ILoggerManager _logger;
        private readonly IUserService _userService;
        private readonly IRepository<User> _repository;

        public AuthController(JwtService jwtService,
            ILoggerManager logger,
            IUserService userService,
            IRepository<User> repository)
        {
            _jwtService = jwtService;
            _logger = logger;
            _userService = userService;
            _repository = repository;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var userProfileDto = new UserProfileDto();
            var userDto = _userService.Register(dto,userProfileDto);
            return CreatedAtAction(nameof(Register), userDto);

        }


        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var userDto = _userService.Login(dto);
            var jwt = _jwtService.Generate(dto, userDto.Id);
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddMinutes(300),
                IsEssential = true,
                SameSite = SameSiteMode.None,
                Secure = true
            });
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

                var returnUser = new UserDto
                {
                    Id = userId,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = user.Role
                };
                return Ok(returnUser);
            }
            catch (Exception e)
            {
                _logger.LogError($"User info request failed: {e.Message}");
                throw new UnauthorizedException("You are not authorized to get user details");
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            _logger.LogInfo("User attempt to log out");

            Response.Cookies.Delete("jwt", new CookieOptions()
            {
                Expires = DateTime.Now.AddDays(-1),
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                IsEssential = true
            });

            _logger.LogInfo("Logout succesful");

            return Ok(new { message = "Succesfully logged out" });
        }

        [HttpDelete("deleteUser/{id}")]
        public IActionResult DeleteUserProfile(int id)
        {
            _userService.DeleteUser(id);
            return Ok();
        }

    }
}
