using CV.Domain.Models.Content;

namespace CV.Dal.Interfaces
{
    public interface IEducationRepository : IRepository<Education>
    {
        public IEnumerable<Education> GetAllEducations();
    }
}
