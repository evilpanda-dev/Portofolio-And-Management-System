using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Repository.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Repository.NewsletterRepository
{
    public interface INewsletterRepository 
    {
        public Newsletter GetByUserId(int userId);
    }
}
