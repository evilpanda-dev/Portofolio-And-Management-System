using System.Text.Json.Serialization;

namespace CVapp.Domain.Models.Authentification
{
    public class User : IEntityBase, IUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; }
    }
}
