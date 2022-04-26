using CVapp.Domain.Models.Authentificated;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Exceptions;
using CVapp.Infrastructure.Repository.UserProfileRepository;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IUserProfileRepository<UserProfile> _userProfileRepository;
        private readonly JwtService _jwtService;
        private readonly HttpContext _httpContext;

        public UserProfileService(IUserProfileRepository<UserProfile> userProfileRepository,JwtService jwtService,IHttpContextAccessor httpContextAccessor)
            {
            _userProfileRepository = userProfileRepository;
            _jwtService = jwtService;
            _httpContext = httpContextAccessor.HttpContext; 
            }

        public UserProfile GetUserProfile()
        {
            throw new NotImplementedException();
        }

        public UserProfileDto SaveAvatar( string path,UserProfileDto userProfileDto)
        {
          var jwtCookie = _httpContext.Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwtCookie);
            int userId = int.Parse(token.Issuer);
            var user = _userProfileRepository.GetById(userId); 

            string message = "";
            var files = userProfileDto.Files;
            var userProfile = new UserProfile
            {
                AboutMe = userProfileDto.AboutMe,
                Address = userProfileDto.Address,
                BirthDate = userProfileDto.BirthDate,
                City = userProfileDto.City,
                Country = userProfileDto.Country,
                FirstName = userProfileDto.FirstName,
                LastName = userProfileDto.LastName,
                Id = userProfileDto.Id,
                ModifiedDate = userProfileDto.ModifiedDate,
                PhoneNumber = userProfileDto.PhoneNumber,
                UserId = userId
            };
            userProfile = _userProfileRepository.Create(userProfile);

            if (userProfile.Id > 0 && files != null && files.Length > 0)
            {

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
                return userProfileDto;
            }
            throw new BadRequestException("File is missing!");  
        }
    }
}
