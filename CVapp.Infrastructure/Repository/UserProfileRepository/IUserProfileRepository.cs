using CVapp.Domain.Models.Authentificated;
using CVapp.Infrastructure.Repository.GenericRepository;

namespace CVapp.Infrastructure.Repository.UserProfileRepository
{
    public interface IUserProfileRepository: IRepository<UserProfile>
    {
        public UserProfile GetByUserId(int id);
    }
}
