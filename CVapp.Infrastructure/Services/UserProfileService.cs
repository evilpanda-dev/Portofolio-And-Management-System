using AutoMapper;
using CVapp.Domain.Models.Authentificated;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Exceptions;
using CVapp.Infrastructure.Helpers;
using CVapp.Infrastructure.Repository.UserProfileRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
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
        //private readonly IPropertyMapper<UserProfileDto,UserProfile> _propertyMapper;
        public UserProfileService(IUserProfileRepository<UserProfile> userProfileRepository, JwtService jwtService, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _userProfileRepository = userProfileRepository;
            _jwtService = jwtService;
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
        }

        public UserProfileDto GetUserProfileData(string environment)
        {
            var jwtCookie = _httpContext.Request.Cookies["jwt"];
            if (jwtCookie == null)
            {
                throw new JwtNotFoundException("Jwt token not found,please login again");
            }
            var token = _jwtService.Verify(jwtCookie);
            int userId = int.Parse(token.Issuer);
            var user = _userProfileRepository.GetByUserId(userId);
            if (user == null)
            {
                throw new UserProfileNotFoundException("User profile not found,provide details in profile page");
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
            try
            {
                string fileName = "avatarPic_" + userProfile.UserId + ".jpg";
            var path = Path.Combine(environment, "usersAvatar", fileName);
                if (path == null)
                {
                    throw new AvatarNotFoundException("Avatar not found,upload avatar in profile page");
                }
                userProfileDto.ImgByte = System.IO.File.ReadAllBytes(path);
            }
            catch (Exception e)
            {
                userProfileDto.ImgByte = null;
            }

            return userProfileDto;
            // return Ok(userProfileDto);
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

        public UserProfileDto UpdateUserProfileData(int id,UserProfileDto userProfileDto)
        {
            try
            {
            var userProfileFromDb = _userProfileRepository.GetByUserId(id);
            var propertyMapper = new PropertyMapper<UserProfileDto, UserProfile>(userProfileDto,userProfileFromDb);
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
            }
            catch (Exception ex)
            {
                throw new BadRequestException("User profile not found!");
            }
            //  var mappedUserProfile = _mapper.Map<UserProfileDto,UserProfile>(userProfileDto,userProfileFromDb);
            // profileToPatch.ApplyTo(userProfileFromDb);

            // var mappedUserProfile = _mapper.Map(userProfileFromDb, userProfileDto);

            return userProfileDto;
        }

    }
}
