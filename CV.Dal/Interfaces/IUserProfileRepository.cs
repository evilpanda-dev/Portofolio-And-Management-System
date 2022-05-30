using CV.Common.DTOs;
using CV.Dal.Query;
using CV.Domain.Models.Auth;

namespace CV.Dal.Interfaces
{
    public interface IUserProfileRepository : IRepository<UserProfile>
    {
        public UserProfile GetByUserId(int id);
        public UserProfile GetUsersProfileData(string name);
        public List<UserDataDto> GetUsersAndTheirProfiles(QueryParameters queryParameters);
        public int CountProfiles();
    }
}
