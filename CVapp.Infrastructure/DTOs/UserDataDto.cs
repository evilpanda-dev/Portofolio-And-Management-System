namespace CVapp.Infrastructure.DTOs
{
    public class UserDataDto : UserDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public int? PhoneNumber { get; set; }
        public string? AboutMe { get; set; }
    }
}
