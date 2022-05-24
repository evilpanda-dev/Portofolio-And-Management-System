using CV.Domain.Models.Auth;

namespace CV.Dal.Interfaces
{
    public interface IUserProfileRepository
    {
        public UserProfile GetByUserId(int id);
    }
}
