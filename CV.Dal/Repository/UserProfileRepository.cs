using CV.Dal.Interfaces;
using CV.Domain.Models.Auth;
using Microsoft.EntityFrameworkCore;

namespace CV.Dal.Repository
{
    public class UserProfileRepository : Repository<UserProfile>, IUserProfileRepository
    {
        private readonly DbContext _context;
        private DbSet<UserProfile> _dbSet;

        public UserProfileRepository(DbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<UserProfile>();
        }

        public UserProfile GetByUserId(int id)
        {
            return _dbSet.FirstOrDefault(e => e.UserId == id);
        }
    }
}
