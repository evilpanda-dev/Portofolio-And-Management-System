using CV.Bll.Abstractions;
using CV.Common.DTOs;
using CV.Common.Exceptions;
using CV.Dal.Helpers;
using CV.Dal.Interfaces;
using CV.Domain.Models.Auth;
using Microsoft.AspNetCore.Http;

namespace CV.Bll.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly JwtService _jwtService;
        private readonly HttpContext _httpContext;

        public UserProfileService(
            IUserProfileRepository userProfileRepository,
            JwtService jwtService,
            IHttpContextAccessor httpContextAccessor)
        {
            _userProfileRepository = userProfileRepository;
            _jwtService = jwtService;
            _httpContext = httpContextAccessor.HttpContext;
        }

        public UserProfileDto GetUserProfileData(string environment)
        {
            var jwtCookie = _httpContext.Request.Cookies["jwt"];
            if (jwtCookie == null)
            {
                throw new EntityNotFoundException("Jwt token not found,please login again");
            }
            var token = _jwtService.Verify(jwtCookie);
            int userId = int.Parse(token.Issuer);
            var user = _userProfileRepository.GetByUserId(userId);
            if (user == null)
            {
                throw new EntityNotFoundException("User profile not found,provide details in profile page");
            }
            var id = user.Id;

            if (id == 0)
            {
                return new UserProfileDto();
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
                PhoneNumber = userProfile.PhoneNumber,
                UserId = userId
            };

            string fileName = "avatarPic_" + userProfile.UserId + ".jpg";
            var path = Path.Combine(environment, "usersAvatar", fileName);
            if (path == null)
            {
                throw new EntityNotFoundException("Avatar not found,upload avatar in profile page");
            }
            userProfileDto.ImgByte = File.ReadAllBytes(path);

            return userProfileDto;
        }

        public UserProfileDto SaveAvatar(string path, UserProfileDto userProfileDto)
        {
            var jwtCookie = _httpContext.Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwtCookie);
            int userId = int.Parse(token.Issuer);
            var user = _userProfileRepository.GetById(userId);

            string message = "";
            var files = userProfileDto.Files;

            var userProfile = _userProfileRepository.GetByUserId(userId);

            if (userProfile.Id > 0 && files != null && files.Length > 0)
            {

                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                string fileName = "avatarPic_" + userProfile.UserId + ".jpg";
                if (File.Exists(path + fileName))
                {
                    File.Delete(path + fileName);
                }
                using (FileStream fileStream = File.Create(path + fileName))
                {
                    files.CopyTo(fileStream);
                    fileStream.Flush();
                    message = "Success";
                }
                return userProfileDto;
            }
            return userProfileDto;
        }

        public UserProfileDto UpdateUserProfileData(int id, UserProfileDto userProfileDto)
        {

            var userProfileFromDb = _userProfileRepository.GetByUserId(id);
            var propertyMapper = new PropertyMapper<UserProfileDto, UserProfile>(userProfileDto, userProfileFromDb);
            propertyMapper.Map(userProfileDto, userProfileFromDb)
                .ForMember(x => x.FirstName)
                .ForMember(x => x.LastName)
                .ForMember(x => x.BirthDate)
                .ForMember(x => x.Address)
                .ForMember(x => x.City)
                .ForMember(x => x.Country)
                .ForMember(x => x.PhoneNumber)
                .ForMember(x => x.AboutMe);
            userProfileFromDb.ModifiedDate = DateTime.Now;
            _userProfileRepository.SaveChanges();

            return userProfileDto;
        }

        public UserProfileDto GetPersonalUserProfileData(string name)
        {
            var userProfile = _userProfileRepository.GetUsersProfileData(name);
            return new UserProfileDto
            {
                AboutMe = userProfile.AboutMe,
                Address = userProfile.Address,
                BirthDate = userProfile.BirthDate,
                City = userProfile.City,
                Country = userProfile.Country,
                FirstName = userProfile.FirstName,
                LastName = userProfile.LastName,
                Id = userProfile.Id,
                PhoneNumber = userProfile.PhoneNumber,
                UserId = userProfile.UserId
            };
        }
    }
}