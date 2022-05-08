using CVapp.Domain.Models.Authentification;
using CVapp.Infrastructure.Repository.GenericRepository;

namespace CVapp.Infrastructure.Repository.UserRepository
{
    public interface IUserRepository
    {
        public User GetByEmail(string email);
        public User GetByUserName(string userName);
    }
}
