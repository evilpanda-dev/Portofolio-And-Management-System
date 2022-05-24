namespace CV.Domain.Models.Content
{
    public class Skill : IEntityBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Range { get; set; }
    }
}
