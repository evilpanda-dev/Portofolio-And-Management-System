using CVapp.Domain.Models.Authentificated;
using CVapp.Infrastructure.Repository.GenericRepository;

namespace CVapp.Infrastructure.Repository.UserProfileRepository
{
    public interface IUserProfileRepository<TEntity> : IRepository<UserProfile> where TEntity : IUserProfile
    {
        public UserProfile GetByUserId(int id);
    }
}
