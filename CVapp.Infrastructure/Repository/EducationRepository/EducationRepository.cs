using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Repository.GenericRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Repository.EducationSectionRepository
{
    public class EducationRepository : Repository<Education>,IEducationRepository
    {
        private readonly DbContext _context;
        private DbSet<Education> _dbSet;

        public EducationRepository(DbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<Education>();
        }
        
       /* public Education Create(Education entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();

            return entity;
        }

        public void Delete(Education entity)
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

        public IEnumerable<Education> Filter() => _dbSet;

        public IEnumerable<Education> Filter(Func<Education, bool> predicate) => _dbSet.Where(predicate);

        public Education GetById(int id)
        {
            return _dbSet.FirstOrDefault(e => e.Id == id);
        }

        public void SaveChanges() => _context.SaveChanges();

        public Education Update(Education entity)
        {
            _dbSet.Update(entity);
            _context.SaveChanges();

            return entity;
        }*/

        public IEnumerable<Education> GetAllEducations()
        {
            return Filter()
                .ToList();
        }
    }
}
