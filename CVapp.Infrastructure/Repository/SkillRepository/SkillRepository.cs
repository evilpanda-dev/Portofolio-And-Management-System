using CVapp.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Repository.SkillRepository
{
    public class SkillRepository : ISkillRepository
    {
        private readonly DbContext _context;
        private DbSet<Skill> _dbSet;

        public SkillRepository(DbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Skill>();
        }

        public Skill Create(Skill entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();

            return entity;
        }

        public void Delete(Skill entity)
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

        public IEnumerable<Skill> Filter() => _dbSet;

        public IEnumerable<Skill> Filter(Func<Skill, bool> predicate) => _dbSet.Where(predicate);

        public Skill GetById(int id)
        {
            return _dbSet.FirstOrDefault(e => e.Id == id);
        }

        public void SaveChanges() => _context.SaveChanges();

        public Skill Update(Skill entity)
        {
            _dbSet.Update(entity);
            _context.SaveChanges();

            return entity;
        }
        public IEnumerable<Skill> GetAllSkills()
        {
            return Filter()
                .ToList();
        }
    }
}
