using CVapp.Repository;
using System.Text.Json.Serialization;

namespace CVapp.Models.Authentification
{
    public class User : IEntityBase
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        [JsonIgnore] 
        public string Password { get; set; }
    }
}
