namespace CVapp.Repository
{
    public interface IRepository<TEntity> where TEntity : IEntityBase
    {
        void Create(TEntity entity);
        void Delete(TEntity entity);
        void Delete(int id);
        void Update(TEntity entity);

        //read data
        TEntity GetById(int id);
        IEnumerable<TEntity> Filter();
        IEnumerable<TEntity> Filter(Func<TEntity, bool> predicate);

        void SaveChanges();
    }
}
