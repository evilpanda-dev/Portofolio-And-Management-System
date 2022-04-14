namespace CVapp.Repository
{
    public interface IEntityBase
    {
        public int Id { get; set; }
        string Email { get; }
    }
}