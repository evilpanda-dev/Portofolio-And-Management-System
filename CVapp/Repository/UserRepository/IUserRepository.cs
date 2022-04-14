namespace CVapp.Repository.UserRepository
{
    public interface IUserRepository<TEntity> where TEntity: IUser
    {
        public TEntity GetByEmail(string email);
    }
}
