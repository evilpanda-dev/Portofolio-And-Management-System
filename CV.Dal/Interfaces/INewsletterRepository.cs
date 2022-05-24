using CV.Domain.Models.Content;

namespace CV.Dal.Interfaces
{
    public interface INewsletterRepository
    {
        public Newsletter GetByUserId(int userId);
    }
}
