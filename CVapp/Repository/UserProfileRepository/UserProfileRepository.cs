using CVapp.Models.Authentificated;
using CVapp.Repository.GenericRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CVapp.Repository.UserProfileRepository
{
    public class UserProfileRepository<TEntity> : IUserProfileRepository<TEntity> where TEntity : class, IUserProfile
    {
        private readonly DbContext _context;
        private DbSet<TEntity> _dbSet;

        public UserProfileRepository(DbContext context)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
        }

        public TEntity GetByUserId(int id)
        {
            return _dbSet.FirstOrDefault(e => e.UserId == id);
        }
    }
}
