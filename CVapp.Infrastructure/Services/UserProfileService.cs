using AutoMapper;
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
        private readonly IMapper _mapper;
        public UserProfileService(IUserProfileRepository<UserProfile> userProfileRepository,JwtService jwtService,IHttpContextAccessor httpContextAccessor,IMapper mapper)
            {
            _userProfileRepository = userProfileRepository;
            _jwtService = jwtService;
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
    }

        public UserProfileDto GetUserProfileData(string environment)
        {
            var jwtCookie = _httpContext.Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwtCookie);
            int userId = int.Parse(token.Issuer);
            var user = _userProfileRepository.GetByUserId(userId);
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
            userProfileDto.ImgByte = System.IO.File.ReadAllBytes(path);

            return userProfileDto;
            // return Ok(userProfileDto);
        }

        public UserProfileDto SaveUserProfileData( string path,UserProfileDto userProfileDto)
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
            return userProfileDto;
            // throw new BadRequestException("File is missing!");  
        }

        public UserProfileDto UpdateUserProfileData(UserProfileDto userProfileDto,int id)
        {

                var userProfileFromDb = _userProfileRepository.GetById(id);
               var mappedUserProfile = _mapper.Map<UserProfileDto,UserProfile>(userProfileDto,userProfileFromDb);
                _userProfileRepository.SaveChanges();
            
            return userProfileDto;
        }
    }
}
