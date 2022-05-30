using CV.Dal.Interfaces;
using CV.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;

namespace CV.Dal.Repository
{
    public class EducationRepository : Repository<Education>, IEducationRepository
    {
        public EducationRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Education> GetAllEducations()
        {
            return Filter()
                .ToList();
        }
    }
}
