using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Query;
using CVapp.Infrastructure.Repository.CommentRepository;
using CVapp.Infrastructure.Repository.UserProfileRepository;
using CVapp.Infrastructure.Repository.UserRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Services
{
    public class DataService : IDataService
    {
        private readonly UserRepository _userRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly CommentRepository _commentRepository;
        public DataService(UserRepository userRepository, UserProfileRepository userProfileRepository, CommentRepository commentRepository)
        {
            _userRepository = userRepository;
            _userProfileRepository = userProfileRepository;
            _commentRepository = commentRepository;
        }

        public UserDataResponse GetAllUsersAndTheirProfiles(QueryParameters queryParameters)
        {
            try
            {
                var result = (from a in _userRepository.Filter().ToList()
                              join b in _userProfileRepository.Filter().ToList() on a.Id equals b.UserId
                              select new UserDataDto
                              {
                                  Id = a.Id,
                                  UserName = a.UserName,
                                  Email = a.Email,
                                  Role = a.Role,
                                  FirstName = b.FirstName,
                                  LastName = b.LastName,
                                  BirthDate = b.BirthDate,
                                  Address = b.Address,
                                  City = b.City,
                                  Country = b.Country,
                                  PhoneNumber = b.PhoneNumber,
                                  AboutMe = b.AboutMe
                              }).ToList();
                
                var queryableResult = result.AsQueryable();
                queryableResult = queryableResult
                    .Skip(queryParameters.PageSize * (queryParameters.PageNumber - 1))
                    .Take(queryParameters.PageSize);
                
                var userDataResponse = new UserDataResponse
                {
                    UserData = queryableResult.ToList(),
                    CurrentPage = queryParameters.PageNumber,
                    TotalItems = result.Count(),
                    Success = true
                };
                return userDataResponse;
            }
            catch (Exception ex)
            {
                return new UserDataResponse { Success = false, Message = ex.Message };
            }
        }

        public CommentResponse GetAllComments(QueryParameters queryParameters)
        {
            try
            {
                var result = (from a in _commentRepository.Filter().ToList()
                              join b in _userRepository.Filter().ToList() on a.UserId equals b.Id
                              select new CommentDto
                              {
                                  Id = a.Id,
                                  Text = a.Text,
                                  UserName = b.UserName,
                                  ParentId = a.ParentId,
                                  CreatedAt = a.CreatedAt
                              }).ToList();
                var queryableResult = result.AsQueryable();
                queryableResult = queryableResult
                    .Skip(queryParameters.PageSize * (queryParameters.PageNumber - 1))
                    .Take(queryParameters.PageSize);
                var commentResponse = new CommentResponse
                {
                    Comments = queryableResult.ToList(),
                    CurrentPage = queryParameters.PageNumber,
                    TotalItems = result.Count(),
                    Success = true
                };
                return commentResponse;
            } catch (Exception e)
            {
                return new CommentResponse { Success = false, Message = e.Message };
            }
        }
    }
}
