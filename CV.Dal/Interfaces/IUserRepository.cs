using CV.Domain.Models.Auth;

namespace CV.Dal.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        public User GetByEmail(string email);
        public User GetByUserName(string userName);
    }
}
