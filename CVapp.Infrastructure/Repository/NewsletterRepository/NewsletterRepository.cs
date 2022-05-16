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

        public Newsletter GetByUserId(int id)
        {
            return _dbSet.FirstOrDefault(e => e.UserId == id);
        }

    }
}
