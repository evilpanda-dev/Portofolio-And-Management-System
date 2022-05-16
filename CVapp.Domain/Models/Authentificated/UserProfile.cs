using CVapp.Domain.Models.Authentification;

namespace CVapp.Domain.Models.Authentificated
{
    public class UserProfile : IEntityBase
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public int? PhoneNumber { get; set; }
        public string? AboutMe { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
    }
}
