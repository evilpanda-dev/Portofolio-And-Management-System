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
        public IActionResult SendProfileData([FromForm] UserProfileDto userProfileDto)
        {
            string path = _hostEnvironment.WebRootPath + "\\usersAvatar\\";
            var userProfile = _userProfileService.SaveAvatar(path, userProfileDto);
            return Ok(userProfile.Files);
        }


        [HttpGet("userProfile")]
        public IActionResult GetUserProfileData()
        {
            var userProfile = _userProfileService.GetUserProfileData(_hostEnvironment.WebRootPath);
            return Ok(userProfile);
        }

        [HttpPatch("updateProfile/{id}")]
        public IActionResult UpdateUserProfile(int id, UserProfileDto userProfileDto)
        {
            var userProfile = _userProfileService.UpdateUserProfileData(id, userProfileDto);
            return StatusCode((int)HttpStatusCode.OK);
        }

        [HttpGet("profile/{name}")]
        public IActionResult GetPersonalProfile(string name)
        {
            var userProfile = _userProfileService.GetPersonalUserProfileData(name);
            return Ok(userProfile);
        }
    }
}
