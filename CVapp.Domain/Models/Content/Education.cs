namespace CV.Domain.Models.Content
{
    public class Education : IEntityBase
    {
        public int Id { get; set; }
        public int Date { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
    }
}
