using CVapp.Models.Authentificated;
using Microsoft.AspNetCore.Mvc;

namespace CVapp.Repository.UserProfileRepository
{
    public interface IUserProfileRepository<TEntity> where TEntity : IUserProfile
    {
        public TEntity GetByUserId(int id);
    }
}
