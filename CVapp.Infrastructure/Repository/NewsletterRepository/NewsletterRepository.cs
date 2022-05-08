using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Repository.GenericRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Repository.NewsletterRepository
{
    public class NewsletterRepository : Repository<Newsletter>,INewsletterRepository
    {
        private readonly DbContext _context;
        private DbSet<Newsletter> _dbSet;

        public NewsletterRepository(DbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<Newsletter>();
        }

        /*public Newsletter Create(Newsletter entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();

            return entity;
        }

        public void Delete(Newsletter entity)
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

        public IEnumerable<Newsletter> Filter() => _dbSet;


        public IEnumerable<Newsletter> Filter(Func<Newsletter, bool> predicate) => _dbSet.Where(predicate);
        public Newsletter GetById(int id)
        {
            return _dbSet.FirstOrDefault(e => e.Id == id);
        }*/

        public Newsletter GetByUserId(int id)
        {
            return _dbSet.FirstOrDefault(e => e.UserId == id);
        }

       /* public void SaveChanges() => _context.SaveChanges();

        public Newsletter Update(Newsletter entity)
        {
            _dbSet.Update(entity);
            _context.SaveChanges();

            return entity;
        }*/
    }
}
