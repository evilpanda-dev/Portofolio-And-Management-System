using CVapp.Domain.Models.Authentificated;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Repository.UserProfileRepository;
using CVapp.Infrastructure.Services;
using LoggerService;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CVapp.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        /*private readonly IUserProfileRepository<UserProfile> _userProfileRepository;
        private readonly IRepository<UserProfile> _genericUserProfileRepo;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly JwtService _jwtService;*/
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly ILoggerManager _logger;
        private readonly JwtService _jwtService;
        private readonly IUserProfileService _userProfileService;
        private readonly IUserProfileRepository<UserProfile> _userProfileRepository;

        public UserProfileController(IWebHostEnvironment hostEnvironment,
                                     ILoggerManager logger,
                                     JwtService jwtService,
                                     IUserProfileRepository<UserProfile> userProfileRepository,
                                     IUserProfileService userProfileService)
        {
            _hostEnvironment = hostEnvironment;
            _logger = logger;
            _jwtService = jwtService;
            _userProfileService = userProfileService;
            _userProfileRepository = userProfileRepository;
        }
        
        [HttpPost("avatar")]
        public IActionResult SaveAvatar([FromForm] UserProfileDto userProfileDto)
        {
                string path = _hostEnvironment.WebRootPath + "\\usersAvatar\\";
                var userProfile = _userProfileService.SaveAvatar(path, userProfileDto);
                return Ok(userProfile);
        }


        [HttpGet("userProfile")]
        public IActionResult GetUserProfile()
        {
            var jwtCookie = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwtCookie);
            int userId = int.Parse(token.Issuer);
            var user = _userProfileRepository.GetByUserId(userId);
            var id = user.Id;

            if (id == 0)
            {
                return Ok(new UserProfile());
            }
            var userProfile = _userProfileRepository.GetById(id);
            var userProfileDto = new UserProfileDto
            {
                AboutMe = userProfile.AboutMe,
                Address = userProfile.Address,
                BirthDate = userProfile.BirthDate,
                City = userProfile.City,
                Country = userProfile.Country,
                FirstName = userProfile.FirstName,
                LastName = userProfile.LastName,
                Id = userProfile.Id,
                ModifiedDate = userProfile.ModifiedDate,
                PhoneNumber = userProfile.PhoneNumber,
                UserId = userId
            };
            string fileName = "avatarPic_" + userProfile.UserId + ".jpg";
            var path = Path.Combine(_hostEnvironment.WebRootPath, "usersAvatar", fileName);
            userProfileDto.ImgByte = System.IO.File.ReadAllBytes(path);
            return Ok(userProfileDto);
        }

    }
}
