using CVapp.Domain.Models.Authentification;
using CVapp.Infrastructure.Repository.GenericRepository;
using Microsoft.EntityFrameworkCore;

namespace CVapp.Infrastructure.Repository.UserRepository
{
    public class UserRepository : Repository<User>,IUserRepository
    {
        private readonly DbContext _context;
        private DbSet<User> _dbSet;

        public UserRepository(DbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<User>();
        }

        /*public User Create(User entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();

            return entity;
        }

        public void Delete(User entity)
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

        public IEnumerable<User> Filter() => _dbSet;

        public IEnumerable<User> Filter(Func<User, bool> predicate) => _dbSet.Where(predicate);*/

        public User GetByEmail(string Email)
        {
            return _dbSet.FirstOrDefault(e => e.Email == Email);
        }

        /*public User GetById(int id)
        {
            return _dbSet.FirstOrDefault(e => e.Id == id);
        }*/

        public User GetByUserName(string username)
        {
            return _dbSet.FirstOrDefault(e => e.UserName == username);
        }

       /* public void SaveChanges() => _context.SaveChanges();

        public User Update(User entity)
        {
            _dbSet.Update(entity);
            _context.SaveChanges();

            return entity;
        }*/
    }
}
