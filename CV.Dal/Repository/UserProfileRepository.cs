using CV.Common.DTOs;
using CV.Dal.Helpers;
using CV.Dal.Interfaces;
using CV.Dal.Query;
using CV.Domain.Models.Auth;
using Microsoft.EntityFrameworkCore;

namespace CV.Dal.Repository
{
    public class UserProfileRepository : Repository<UserProfile>, IUserProfileRepository
    {
        private readonly DbSet<User> _userDbSet;
        public UserProfileRepository(DbContext context) : base(context)
        {
            _userDbSet = context.Set<User>();
        }

        public UserProfile GetByUserId(int id)
        {
            return _dbSet.FirstOrDefault(e => e.UserId == id);
        }

        public UserProfile GetUsersProfileData(string name)
        {
            return _dbSet.ToList().FirstOrDefault(x => x.UserId == _userDbSet.FirstOrDefault(y => y.UserName == name).Id);
        }

        public List<UserDataDto> GetUsersAndTheirProfiles(QueryParameters queryParameters)
        {
            var usersProfiles = (from a in _dbSet.Include(x => x.User)
                                 select new UserDataDto
                                 {
                                     Id = a.Id,
                                     UserName = a.User.UserName,
                                     Email = a.User.Email,
                                     Role = a.User.Role,
                                     FirstName = a.FirstName,
                                     LastName = a.LastName,
                                     BirthDate = a.BirthDate,
                                     Address = a.Address,
                                     City = a.City,
                                     Country = a.Country,
                                     PhoneNumber = a.PhoneNumber,
                                     AboutMe = a.AboutMe
                                 }).ToList();
            var queryableResult = CommonMethods.Paginate(usersProfiles, queryParameters);
            return queryableResult;
        }

        public int CountProfiles()
        {
            return _dbSet.Count();
        }
    }
}
