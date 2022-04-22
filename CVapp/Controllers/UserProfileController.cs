using CVapp.Domain.Models.Authentificated;
using CVapp.Infrastructure.Abstractions;
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
       // private readonly IUserProfileService _userProfileService;
        private readonly IUserProfileRepository<UserProfile> _userProfileRepository;

        public UserProfileController(IWebHostEnvironment hostEnvironment,ILoggerManager logger,JwtService jwtService,IUserProfileRepository<UserProfile> userProfileRepository)
        {
            _hostEnvironment = hostEnvironment;
            _logger = logger;
            _jwtService = jwtService;
          //  _userProfileService = userProfileService;
            _userProfileRepository = userProfileRepository;
        }

        [HttpPost("avatar")]
        public IActionResult SaveAvatar([FromForm] UserProfile userProfile)
        {
            try
            {
                var jwtCookie = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwtCookie);
                int userId = int.Parse(token.Issuer);
                var user = _userProfileRepository.GetById(userId);
                var getId = userId;

                string message = "";
                var files = userProfile.Files;
                userProfile.Files = null;
                userProfile.UserId = getId;
                userProfile = _userProfileRepository.Create(userProfile);

                if (userProfile.Id > 0 && files != null && files.Length > 0)
                {
                    string path = _hostEnvironment.WebRootPath + "\\usersAvatar\\";
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    string fileName = "avatarPic_" + userProfile.UserId + ".jpg";
                    if (System.IO.File.Exists(path + fileName))
                    {
                        System.IO.File.Delete(path + fileName);
                    }
                    using (FileStream fileStream = System.IO.File.Create(path + fileName))
                    {
                        files.CopyTo(fileStream);
                        fileStream.Flush();
                        message = "Success";
                    }
                }
                else if (userProfile.Id == 0)
                {
                    message = "Failed";
                }
                else
                {
                    message = "Success";
                }
                if (message == "Success")
                {
                    return Ok(userProfile);
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError, message);
                }
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
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
            string fileName = "avatarPic_" + userProfile.UserId + ".jpg";
            var path = Path.Combine(_hostEnvironment.WebRootPath, "usersAvatar", fileName);
            userProfile.ImgByte = System.IO.File.ReadAllBytes(path);
            return Ok(userProfile);
        }

    }
}
