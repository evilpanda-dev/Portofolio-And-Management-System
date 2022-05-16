using CVapp.Domain.Models.Content;

namespace CVapp.Infrastructure.Repository.EducationRepository
{
    public interface IEducationRepository
    {
        public IEnumerable<Education> GetAllEducations();
    }
}
