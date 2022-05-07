using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Repository.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Repository.NewsletterRepository
{
    public interface INewsletterRepository : IRepository<Newsletter>
    {
        public Newsletter GetByUserId(int userId);
    }
}
