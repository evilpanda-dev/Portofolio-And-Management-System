using CVapp.Domain.Models.Authentificated;
using Microsoft.EntityFrameworkCore;

namespace CVapp.Infrastructure.Repository.UserProfileRepository
{
    public class UserProfileRepository<TEntity> : IUserProfileRepository<TEntity> where TEntity : UserProfile
    {
        private readonly DbContext _context;
        private DbSet<UserProfile> _dbSet;

        public UserProfileRepository(DbContext context)
        {
            _context = context;
            _dbSet = _context.Set<UserProfile>();
        }

        public UserProfile Create(UserProfile entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();

            return entity;
        }

        public void Delete(UserProfile entity)
        {
            _dbSet.Remove(entity);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var entityToDelete = _dbSet.FirstOrDefault(e => e.Id == id);
            if (entityToDelete != null)
            {
                _dbSet.Remove(entityToDelete);
                _context.SaveChanges();
            }
        }

        public IEnumerable<UserProfile> Filter() => _dbSet;


        public IEnumerable<UserProfile> Filter(Func<UserProfile, bool> predicate) => _dbSet.Where(predicate);
        public UserProfile GetById(int id)
        {
            return _dbSet.FirstOrDefault(e => e.Id == id);
        }

        public UserProfile GetByUserId(int id)
        {
            return _dbSet.FirstOrDefault(e => e.UserId == id);
        }

        public void SaveChanges() => _context.SaveChanges();

        public UserProfile Update(UserProfile entity)
        {
            _dbSet.Update(entity);
            _context.SaveChanges();

            return entity;
        }
    }
}
