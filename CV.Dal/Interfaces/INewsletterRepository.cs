using CV.Domain.Models.Content;

namespace CV.Dal.Interfaces
{
    public interface INewsletterRepository : IRepository<Newsletter>
    {
        public Newsletter GetByUserId(int userId);
    }
}
