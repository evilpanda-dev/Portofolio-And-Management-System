using CV.Domain.Models.Content;

namespace CV.Dal.Interfaces
{
    public interface IEducationRepository
    {
        public IEnumerable<Education> GetAllEducations();
    }
}
