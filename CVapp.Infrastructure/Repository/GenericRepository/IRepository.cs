using CVapp.Domain.Models;

namespace CVapp.Infrastructure.Repository.GenericRepository
{
    public interface IRepository<TEntity> where TEntity : IEntityBase
    {
        TEntity Create(TEntity entity);
        void Delete(TEntity entity);
        void Delete(int id);
        TEntity Update(TEntity entity);

        //read data
        TEntity GetById(int id);
        //public TEntity GetByEmail(string email);
        IEnumerable<TEntity> Filter();
        IEnumerable<TEntity> Filter(Func<TEntity, bool> predicate);

        void SaveChanges();
    }
}
