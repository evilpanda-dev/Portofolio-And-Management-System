using Microsoft.EntityFrameworkCore;

namespace CVapp.Repository.UserRepository
{
    public class UserRepository<TEntity> :IUserRepository<TEntity> where TEntity:class,IUser
    {
        private readonly DbContext _context;
        private DbSet<TEntity> _dbSet;

        public UserRepository(DbContext context)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
        }

        public TEntity GetByEmail(string Email)
        {
            return _dbSet.FirstOrDefault(e => e.Email == Email);
        }
        
        public TEntity GetByUserName(string username)
        {
            return _dbSet.FirstOrDefault(e => e.UserName == username);
        }
    }
}
