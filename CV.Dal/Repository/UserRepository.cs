using CV.Dal.Interfaces;
using CV.Domain.Models.Auth;
using Microsoft.EntityFrameworkCore;

namespace CV.Dal.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(DbContext context) : base(context)
        {
        }

        public User GetByEmail(string Email)
        {
            return _dbSet.FirstOrDefault(e => e.Email == Email);
        }

        public User GetByUserName(string username)
        {
            return _dbSet.FirstOrDefault(e => e.UserName == username);
        }
    }
}
