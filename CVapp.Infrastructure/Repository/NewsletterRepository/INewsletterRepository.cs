using CVapp.Domain.Models.Content;

namespace CVapp.Infrastructure.Repository.NewsletterRepository
{
    public interface INewsletterRepository
    {
        public Newsletter GetByUserId(int userId);
    }
}
