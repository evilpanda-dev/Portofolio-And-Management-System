using CVapp.Domain.Models.Authentificated;
using CVapp.Infrastructure.Repository.GenericRepository;

namespace CVapp.Infrastructure.Repository.UserProfileRepository
{
    public interface IUserProfileRepository 
    {
        public UserProfile GetByUserId(int id);
    }
}
