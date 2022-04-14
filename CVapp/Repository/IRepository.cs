namespace CVapp.Repository
{
    public interface IRepository<TEntity> where TEntity : IEntityBase
    {
        public TEntity Create(TEntity entity);
        void Delete(TEntity entity);
        void Delete(int id);
        public TEntity Update(TEntity entity);

        //read data
        TEntity GetById(int id);
        IEnumerable<TEntity> Filter();
        IEnumerable<TEntity> Filter(Func<TEntity, bool> predicate);

        void SaveChanges();
    }
}
