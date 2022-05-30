using CV.Bll.Abstractions;
using CV.Bll.Services;
using CV.Common.DTOs;
using CV.Common.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace CV.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : Controller
    {
        private readonly JwtService _jwtService;
        private readonly ILoggerManager _logger;
        private readonly IUserService _userService;

        public AuthController(JwtService jwtService,
            ILoggerManager logger,
            IUserService userService)
        {
            _jwtService = jwtService;
            _logger = logger;
            _userService = userService;
        }

        [HttpPost("register")]
        public UserDto Register(RegisterDto dto)
        {
            var userProfileDto = new UserProfileDto();
            var userDto = _userService.Register(dto, userProfileDto);
            return userDto;

        }


        [HttpPost("login")]
        public object Login(LoginDto dto)
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
            return new { message = "Succesfully logged in" };
        }

        [HttpGet("user")]
        public UserDto User()
        {
            _logger.LogInfo("User info requested");
            try
            {
                var jwtCookie = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwtCookie);

                int userId = int.Parse(token.Issuer);

                var user = _userService.GetUser(userId);

                var returnUser = new UserDto
                {
                    Id = userId,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = user.Role
                };
                return returnUser;
            }
            catch (Exception e)
            {
                _logger.LogError($"User info request failed: {e.Message}");
                throw new UnauthorizedException("You are not authorized to get user details");
            }
        }

        [HttpPost("logout")]
        public object Logout()
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

            return new { message = "Succesfully logged out" };
        }

        [HttpDelete("deleteUser/{id}")]
        public void DeleteUserProfile(int id)
        {
            _userService.DeleteUser(id);
        }

    }
}
