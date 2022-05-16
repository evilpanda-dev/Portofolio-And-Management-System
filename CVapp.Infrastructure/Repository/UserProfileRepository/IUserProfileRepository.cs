using CVapp.Domain.Models.Authentificated;

namespace CVapp.Infrastructure.Repository.UserProfileRepository
{
    public interface IUserProfileRepository
    {
        public UserProfile GetByUserId(int id);
    }
}
