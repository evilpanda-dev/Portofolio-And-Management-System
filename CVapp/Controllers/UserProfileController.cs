using CV.Bll.Abstractions;
using CV.Common.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CV.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IUserProfileService _userProfileService;

        public UserProfileController(IWebHostEnvironment hostEnvironment,
                                     IUserProfileService userProfileService)
        {
            _hostEnvironment = hostEnvironment;
            _userProfileService = userProfileService;
        }

        [HttpPost("saveAvatar")]
        public IFormFile SendProfileData([FromForm] UserProfileDto userProfileDto)
        {
            string path = _hostEnvironment.WebRootPath + "\\usersAvatar\\";
            var userProfile = _userProfileService.SaveAvatar(path, userProfileDto);
            return userProfile.Files;
        }


        [HttpGet("userProfile")]
        public UserProfileDto GetUserProfileData()
        {
            var userProfile = _userProfileService.GetUserProfileData(_hostEnvironment.WebRootPath);
            return userProfile;
        }

        [HttpPatch("updateProfile/{id}")]
        public StatusCodeResult UpdateUserProfile(int id, UserProfileDto userProfileDto)
        {
            var userProfile = _userProfileService.UpdateUserProfileData(id, userProfileDto);
            return StatusCode((int)HttpStatusCode.OK);
        }

        [HttpGet("profile/{name}")]
        public UserProfileDto GetPersonalProfile(string name)
        {
            var userProfile = _userProfileService.GetPersonalUserProfileData(name);
            return userProfile;
        }
    }
}
