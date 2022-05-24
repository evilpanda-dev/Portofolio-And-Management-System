using CV.Dal.Interfaces;
using CV.Domain.Models.Auth;
using Microsoft.EntityFrameworkCore;

namespace CV.Dal.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly DbContext _context;
        private DbSet<User> _dbSet;

        public UserRepository(DbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<User>();
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
